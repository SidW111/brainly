import axios from "axios";
import {  useState } from "react";
import { BACKEND_URI } from "../config";

export function useContent(){
    const [contents,setContents] = useState([]);
    function refresh() {
        axios.get(`${BACKEND_URI}/api/v1/content`,{
            headers:{
                Authorization: localStorage.getItem("token"),
            }
        }).then((response) =>{
            setContents(response.data.content)
        })
    }
    // useEffect(()=>{
    //     refresh()
    //     let interval = setInterval(() => {
    //         refresh()
    //     },10 * 1000)

    //     return () => {
    //         clearInterval(interval);
    //     }
    // },[])

    return {contents ,refresh};
}