import start from '../style/images/start.png'
import "../style/landing.css"
import { useTranslation } from 'react-i18next';
function Landing(){
    const { t } = useTranslation();
    return(
        <div class='main'>
            <div class = "intro">
            <img id="langing_page" src = {start} alt ="langing_page"></img>
            <div class ="intro_text mb"> {t('greeting')}</div> 
            </div>
            <div class="buttons_r">
                <button class="auto">Entrar</button>
                <button class="auto">Registrar</button>
            </div>
           
        </div>
    )
}
export default Landing;