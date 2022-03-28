import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
    clientName: yup.string().min(2, 'O nome do cliente deve ter ao menos 2 caracteres').required('Este campo não pode estar vazio!'),
    tel: yup.string().required('Este campo não pode estar vazio!'),
    mail: yup.string().email('Por favor digite um email valido').required('Este campo não pode estar vazio!')
}).required();

export function CreateLeads(){
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    function selectAll(){
        let checkInputs = document.querySelectorAll('.box');
        let boxAll = document.querySelector('.boxAll');

        for (let i = 0; i < checkInputs.length; i++) {
            if(checkInputs[i].checked === true && boxAll.checked == false){
                checkInputs[i].checked = false;
            } else{
                checkInputs[i].checked = true;
            }
        }
    }

    function saveClient(){
        let Button = document.querySelector('.Button')

        Button.classList.add('saveButton')
        Button.innerHTML = 'Salvo'

        setTimeout(() => {
            Button.classList.remove('saveButton')
            Button.innerHTML = 'Salvar'

            navigate('/leads')
        }, 3000)
    }

    const navigate = useNavigate();

    function onSubmit(data){
        let clients = [];
        
        if (localStorage.hasOwnProperty("@clients")) {
            clients = JSON.parse(localStorage.getItem("@clients"))
        }
        clients.push(data)
        for (let i = 0; i < clients.length; i++) {
            clients[i].status = '0'
        }
       
        localStorage.setItem('@clients', JSON.stringify(clients))
        
        saveClient();
    }

    return(
        <div className="createLeads">
            <div className="createLeads__container">
                <header className="header">
                    <p className="header__logo">Elo<span>group</span></p>
                    <h1 className="header__title">Painel de leads</h1>
                </header>
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="form__camp1">
                        <label>Nome do cliente*
                            <input type={'text'} {...register('clientName', {required: true})}/>
                            {errors.clientName && <span>{errors.clientName?.message}</span>}
                        </label>
                        <label>Telefone*
                            <input type={'number'}{...register('tel', {required: true})}/>
                            {errors.tel && <span>{errors.tel?.message}</span>}
                        </label>
                        <label>Email*
                            <input type={'email'}{...register('mail', {required: true})}/>
                            {errors.mail && <span>{errors.mail?.message}</span>}
                        </label>
                    </fieldset>
                    <fieldset className="form__camp2">
                        <label>Oportunidades*</label>
                        
                        <fieldset className="form__camp2--checkfield">
                            <label>
                                <input className="boxAll" onClick={selectAll} type={'checkbox'}{...register('all')}/>Todos
                            </label>
                            <label>
                                <input className="box" type={'checkbox'}{...register('RPA')}/> RPA
                            </label>
                            <label>
                                <input className="box" type={'checkbox'}{...register('pDigital')}/> Produto Digital
                            </label>
                            <label>
                                <input className="box" type={'checkbox'}{...register('analytics')}/> Digital analytics
                            </label>
                            <label>
                                <input className="box" type={'checkbox'}{...register('BPM')}/> BPM
                            </label>
                        </fieldset>
                        
                        <button className="Button" type="submit">Salvar</button>
                    </fieldset>
                    
                </form>
            </div>
        </div>
    )
}


