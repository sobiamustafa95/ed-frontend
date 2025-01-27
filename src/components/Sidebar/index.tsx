import SidebarContainer from './SidebarContainer';
import SidebarDivider from './SidebarDivider';
import SidebarFooter from './SidebarFooter';
import SidebarTabs from './SidebarTabs';

const Sidebar = () => {
  return (
    <SidebarContainer>
      <div className='absolute h-[1px] w-full border-b-greyWhite bg-white border-b top-[71px]' />
      <div className='w-full h-[calc(100vh-70px)] flex flex-col justify-between items-start md:items-center'>
        <SidebarTabs />
        <div className='w-full flex flex-col md:items-center items-start'>
          <SidebarDivider />
          <SidebarFooter />
        </div>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
