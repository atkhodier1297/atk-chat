import Nav from "./Nav";

export default function Layout({ children }){
    return(
        <div className="mx-6 max-w-2xl md:mx-auto bg-red-50 font-poppins">
            <Nav/>
            <main>{children}</main>
        </div>
    )
}