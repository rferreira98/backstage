/*
 * Copyright 2022 The Backstage Authors
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
  Content,
  EmptyState,
  ErrorPanel,
  Header,
  Page,
  Progress,
} from '@backstage/core-components';
import { useApi, useRouteRef } from '@backstage/core-plugin-api';
import { useTranslationRef } from '@backstage/core-plugin-api/alpha';
import { CatalogFilterLayout } from '@backstage/plugin-catalog-react';
import { scaffolderApiRef } from '@backstage/plugin-scaffolder-react';
import { ScaffolderPageContextMenu } from '@backstage/plugin-scaffolder-react/alpha';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAsync from 'react-use/esm/useAsync';
import {
  actionsRouteRef,
  editRouteRef,
  rootRouteRef,
  templatingExtensionsRouteRef,
} from '../../routes';
import { scaffolderTranslationRef } from '../../translation';
import ListTasksTable from './ListTasksTable';
import { OwnerListPicker } from './OwnerListPicker';

export interface MyTaskPageProps {
  initiallySelectedFilter?: 'owned' | 'all';
  contextMenu?: {
    editor?: boolean;
    actions?: boolean;
    create?: boolean;
  };
}

const ListTaskPageContent = (props: MyTaskPageProps) => {
  const { initiallySelectedFilter = 'owned' } = props;
  const { t } = useTranslationRef(scaffolderTranslationRef);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);

  const scaffolderApi = useApi(scaffolderApiRef);

  const [ownerFilter, setOwnerFilter] = useState(initiallySelectedFilter);
  const { value, loading, error } = useAsync(() => {
    if (scaffolderApi.listTasks) {
      return scaffolderApi.listTasks?.({
        filterByOwnership: ownerFilter,
        limit,
        offset: page * limit,
      });
    }

    // eslint-disable-next-line no-console
    console.warn(
      'listTasks is not implemented in the scaffolderApi, please make sure to implement this method.',
    );

    return Promise.resolve({ tasks: [], totalTasks: 0 });
  }, [scaffolderApi, ownerFilter, limit, page]);

  if (loading) {
    return <Progress />;
  }

  if (error) {
    return (
      <>
        <ErrorPanel error={error} />
        <EmptyState
          missing="info"
          title={t('listTaskPage.content.emptyState.title')}
          description={t('listTaskPage.content.emptyState.description')}
        />
      </>
    );
  }

  return (
    <CatalogFilterLayout>
      <CatalogFilterLayout.Filters>
        <OwnerListPicker
          filter={ownerFilter}
          onSelectOwner={id => setOwnerFilter(id)}
        />
      </CatalogFilterLayout.Filters>
      <CatalogFilterLayout.Content>
        <ListTasksTable
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          tasks={value?.tasks}
          totalTasks={value?.totalTasks}
        />
      </CatalogFilterLayout.Content>
    </CatalogFilterLayout>
  );
};

export const ListTasksPage = (props: MyTaskPageProps) => {
  const navigate = useNavigate();
  const editorLink = useRouteRef(editRouteRef);
  const actionsLink = useRouteRef(actionsRouteRef);
  const createLink = useRouteRef(rootRouteRef);
  const { t } = useTranslationRef(scaffolderTranslationRef);
  const templatingExtensionsLink = useRouteRef(templatingExtensionsRouteRef);

  const scaffolderPageContextMenuProps = {
    onEditorClicked:
      props?.contextMenu?.editor !== false
        ? () => navigate(editorLink())
        : undefined,
    onActionsClicked:
      props?.contextMenu?.actions !== false
        ? () => navigate(actionsLink())
        : undefined,
    onTasksClicked: undefined,
    onCreateClicked:
      props?.contextMenu?.create !== false
        ? () => navigate(createLink())
        : undefined,
    onTemplatingExtensionsClicked: () => navigate(templatingExtensionsLink()),
  };
  return (
    <Page themeId="home">
      <Header
        pageTitleOverride={t('listTaskPage.pageTitle')}
        title={t('listTaskPage.title')}
        subtitle={t('listTaskPage.subtitle')}
      >
        <ScaffolderPageContextMenu {...scaffolderPageContextMenuProps} />
      </Header>
      <Content>
        <ListTaskPageContent {...props} />
      </Content>
    </Page>
  );
};
