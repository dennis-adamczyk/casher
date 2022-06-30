import Content from '@/components/layout/Content';
import type { NextPage } from 'next';
import AddCategoryForm from '@/components/common/AddCategoryForm';

const Goals: NextPage = (props) => {
  return (
    <Content>
      <AddCategoryForm title="Neue Kategorie"/>
    </Content>
  );
};

export default Goals;
