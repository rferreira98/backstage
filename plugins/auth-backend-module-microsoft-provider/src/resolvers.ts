/*
 * Copyright 2023 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  OAuthAuthenticatorResult,
  createSignInResolverFactory,
  PassportProfile,
  SignInInfo,
} from '@backstage/plugin-auth-node';
import { z } from 'zod';

/**
 * Available sign-in resolvers for the Microsoft auth provider.
 *
 * @public
 */
export namespace microsoftSignInResolvers {
  /**
   * Looks up the user by matching their Microsoft email to the email entity annotation.
   */
  export const emailMatchingUserEntityAnnotation = createSignInResolverFactory({
    optionsSchema: z
      .object({
        dangerouslyAllowSignInWithoutUserInCatalog: z.boolean().optional(),
      })
      .optional(),
    create(options = {}) {
      return async (
        info: SignInInfo<OAuthAuthenticatorResult<PassportProfile>>,
        ctx,
      ) => {
        const { profile } = info;

        if (!profile.email) {
          throw new Error('Microsoft profile contained no email');
        }

        return ctx.signInWithCatalogUser(
          {
            annotations: {
              'microsoft.com/email': profile.email,
            },
          },
          {
            dangerousEntityRefFallback:
              options?.dangerouslyAllowSignInWithoutUserInCatalog
                ? { entityRef: { name: profile.email } }
                : undefined,
          },
        );
      };
    },
  });
  /**
   * Looks up the user by matching their Microsoft user id to the user id entity annotation.
   */
  export const userIdMatchingUserEntityAnnotation = createSignInResolverFactory(
    {
      optionsSchema: z
        .object({
          dangerouslyAllowSignInWithoutUserInCatalog: z.boolean().optional(),
        })
        .optional(),
      create(options = {}) {
        return async (
          info: SignInInfo<OAuthAuthenticatorResult<PassportProfile>>,
          ctx,
        ) => {
          const { result } = info;

          const id = result.fullProfile.id;

          if (!id) {
            throw new Error('Microsoft profile contained no id');
          }

          return ctx.signInWithCatalogUser(
            {
              annotations: {
                'graph.microsoft.com/user-id': id,
              },
            },
            {
              dangerousEntityRefFallback:
                options?.dangerouslyAllowSignInWithoutUserInCatalog
                  ? { entityRef: { name: id } }
                  : undefined,
            },
          );
        };
      },
    },
  );
}
