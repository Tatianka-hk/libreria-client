import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react"
import axios from 'axios';
function Admin(){
    const { t } = useTranslation();
    useEffect(async()=>{
        await axios.get(`http://localhost:4000/auth/admin_check`,
        { headers: { accessToken: localStorage.getItem("token") }
    }).then((res)=>{
        if(res.data.mes === "no"){
            window.location.href="/"
        }
    })
    }, [])

    return(
        <div class="user_main">
            <div class="admin_buttons">
                <button class="admin_button" onClick={()=>{window.location.href="add/admin"}}>{t('add_admin')}</button>
                <button class="admin_button" onClick={()=>{window.location.href="/users"}}>{t('users')}</button>
                <button class="admin_button" onClick={()=>{window.location.href="/books"}}>{t('books')}</button>
            </div>


        </div>
    )
}

export default Admin;