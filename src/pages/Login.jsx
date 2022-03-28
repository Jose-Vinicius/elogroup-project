import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const userAccount = JSON.parse(localStorage.getItem('@User'))
let userName = userAccount.name
let userPassword = userAccount.password

const schema = yup.object({
    name: yup.string().required('Usuario ou senha incorretos'),
    password: yup.string().required('Usuario ou senha incorretos'),
}).required();

export function Login(){
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const navigate = useNavigate();

    function onSubmit(data){
        const localdata = localStorage.getItem("@User");
        if(localdata){
            const account = JSON.parse(localdata);

            if(account.user === data.user && account.password === data.password){
                localStorage.setItem("@Logged", JSON.stringify(data));
                navigate('/leads');
            }
        }
    }


    return(
    <div className="login">
        <div className="container">
            <p className="container__logo">Elo<span>group</span></p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Usuário*
                    <input type={'text'} {...register('name', {required: true})}/>
                    {errors.name && <span>{errors.name?.message}</span>}
                </label>
                <label>Senha*
                    <input type={'password'} placeholder={'********'}{...register('password', {required: true})}/>
                    {errors.password && <span>{errors.password?.message}</span>}
                </label>
                <button type="submit">Entrar</button>
            </form>
        </div>
    </div>
    )
}