import {useState,useEffect} from "react";

const API= import.meta.env.VITE_API_URL;

export default function App(){ 

    const[token,setToken]=useState(localStorage.getItem("token"));

    const[products,setProducts]=useState([]);

    const[email,setEmail]=useState("");

    const[password,setPassword]=useState("");

    const[name,setName]=useState("");

    const[price,setPrice]=useState("");

    

    async function login(){

        const res=await fetch(API+"/auth/login",{

        method:"POST",

        headers:{"Content-Type":"application/json"},

        body:JSON.stringify({email,password})

        });

        const data=await res.json();

        if(data.token){

        localStorage.setItem("token",data.token);

        setToken(data.token);

        }

    }

    

    async function addProduct(){

        await fetch(API+"/products",{

        method:"POST",

        headers:{"Content-Type":"application/json",Authorization:token},

        body:JSON.stringify({name,price})

        });

        loadProductsUtil();

    }

    

    async function deleteProduct(id){

        await fetch(API+"/products/"+id,{

        method:"DELETE",

        headers:{Authorization:token}

        });

        loadProductsUtil();

    }

    

    async function loadProductsUtil(){

        const res=await fetch(API+"/products",{headers:{Authorization:token}});

        setProducts(await res.json());

    }

    

    useEffect(() => {
        if (token) {
            const loadProducts = async () => {
                try {
                    const res = await fetch(API + "/products", { headers: { Authorization: token } });
                    setProducts(await res.json());
                } catch (error) {
                    console.error("Error al cargar los productos:", error);
                }
            };
            loadProducts();
        }
    }, [token]);

    

    if(!token){

        return(

        <div>

        <h2>Login</h2>

        <input onChange={e=>setEmail(e.target.value)} placeholder="Email"/>

        <input onChange={e=>setPassword(e.target.value)} placeholder="Password"/>

        <button onClick={login}>Login</button>

        </div>

        );

    }

    

    return(

        <div>

        <h2>Productos</h2>

        <input onChange={e=>setName(e.target.value)} placeholder="Nombre"/>

        <input onChange={e=>setPrice(e.target.value)} placeholder="Precio"/>

        <button onClick={addProduct}>Agregar</button>

        

        {products.map(p=>(

            <div key={p._id}>

                {p.name} ${p.price}

                <button onClick={()=>deleteProduct(p._id)}>X</button>

            </div>

        ))}

        </div>

    );

}