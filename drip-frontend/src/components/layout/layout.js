import Header from "@/components/header/header";

const MainLayout = ({children}) => (
  <div>
    <Header />
    {
      children
    }
  </div>
);

export default MainLayout;