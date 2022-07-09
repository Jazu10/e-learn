import { Header, Notify, Footer } from "./";

function Layout({ children }) {
   return (
      <div className="w-auto">
         <Header />
         <Notify />
         <div className="min-h-screen">{children}</div>
         {/* <div className="h-20" /> */}
         <Footer />
      </div>
   );
}

export default Layout;
