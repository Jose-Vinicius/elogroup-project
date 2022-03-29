import { Link } from "react-router-dom";

let clients = JSON.parse(localStorage.getItem('@clients'));

export function Leads(){

    let clients = JSON.parse(localStorage.getItem('@clients'));

    const clientList = async () => {
        let gridContainer = document.querySelector('.grid');
        const client = clients.map(({clientName}) => `
        <div class="grid__teste grid__item">
            ${clientName}
        </div>
        `).join('')

        gridContainer.innerHTML += client
    }
    
    clientList();
    
    return(
        <div className="leads">
            <div className="leads__container">
                <header className="header">
                    <p className="header__logo">Elo<span>group</span></p>
                    <h1 className="header__title">Painel de leads</h1>
                </header>
                <div className="button__newLeads">
                    <Link to="/createLeads" >New leads (+)</Link>
                </div>
                <section className="grid">
                    <div className="grid__client grid__item">
                        Cliente em potencial
                    </div>
                    <div className="grid__data grid__item">
                        Dados confirmados
                    </div>
                    <div className="grid__meeting grid__item">
                        Reunião agendada
                    </div>
                </section>
            </div>
        </div>   
    )
}