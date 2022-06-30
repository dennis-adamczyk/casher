import Content from '@/components/layout/Content';
import type { NextPage } from 'next';
import AddCategoryForm from '@/components/common/AddCategoryForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

const Goals: NextPage = () => {
  return (
    <Content>
      <AddCategoryForm title="Neue Kategorie" />
    </Content>
  );
};

export default withPageAuthRequired(Goals);
