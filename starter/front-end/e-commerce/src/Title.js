export default function Title(props) {
    return (
        <div>
            <h1 style={{ textAlign:"center", padding:'20px'}}>
                {props.mainTitle}
                {props.subTitle}
                    
            </h1>
            
            {/* <button style={{borderBottom:'5px solid black'}}>
         {props.button}
            </button> */}
        </div>
    )
}
// 總之你是可以讓多個不同的component都可以享用到同一個style
// 這個位置好像不能夠應用在button上面
// 爲什麽第二個就不行呢
//總之有相同style的component可以這樣做
// 它不是一個body, body的意思是要一個element