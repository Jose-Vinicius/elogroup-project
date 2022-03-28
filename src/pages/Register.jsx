import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
    name: yup.string().required('Este campo não pode estar vazio!'),
    password: yup.string().min(8, 'A senha deve conter ao menos 8 digitos').matches(/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    'Este campo deve conter uma senha valida').required('Este campo não pode estar vazio!'),
    confirmPassword: yup.string().required('Este campo não pode estar vazio!').oneOf([yup.ref('password')], 'As senha devem ser iguais'),
}).required();

export function Register(){
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    
    const navigate = useNavigate();

    function onSubmit(data){
        localStorage.removeItem('@clients')
        localStorage.setItem("@User", JSON.stringify(data));
        localStorage.removeItem("@Logged")
        navigate('/login');
    }

    return(
        <div className="register">
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
                    <label>Confirmação de Senha*
                        <input type={'password'} placeholder={'********'} {...register('confirmPassword', {required: true})}/>
                        {errors.confirmPassword && <span>{errors.confirmPassword?.message}</span>}
                    </label>
                    <button type="submit">Registrar</button>
                </form>
            </div>
        </div>
    )
}


