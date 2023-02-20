export default function Message({children, avatar, username, description}){
    return(
        <div className="shadow-lg shadow-cyan-500 p-8 border-b-2 rounded-lg">
            <div className="flex items-center gap-2">
                <img src={avatar} alt="NF" className="w-10 rounded-full "/>
                <h2>{username}</h2>
            </div>
            <div className="py-4">
                {description}
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}