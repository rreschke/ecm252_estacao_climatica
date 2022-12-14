import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom'
import React from 'react'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      latitude: null,
      longitude: null,
      estacao: null,
      data: null,
      icone: null,
      mensagemDeErro: null
    }
  }

  obterEstacao = (data, latitude) => {
    const anoAtual = data.getFullYear()
    //new Date(ano, mês(0, 11), dia(1, 31))
    const d1 = new Date (anoAtual, 5, 21)
    //24/09
    const d2 = new Date(anoAtual, 8, 24)
    //22/12
    const d3 = new Date(anoAtual, 11, 22)
    //21/03
    const d4 = new Date (anoAtual, 2, 21)
    const sul = latitude < 0
    if (data >= d1 && data < d2)
      return sul ? 'Inverno' : 'Verão'
    if (data >= d2 && data < d3)
      return sul ? 'Primavera' : 'Outono'
    if (data >= d3 && data < d4)
      return sul ? 'Verão' : 'Inverno'
    return sul ? 'Outono' : 'Primavera'
  }

  icones = {
    'Primavera': 'fa-seedling',
    'Verão': 'fa-umbrella-beach',
    'Outono': 'fa-tree',
    'Inverno': 'fa-snowman'
  }

  obterLocalizacao = () => {
    window.navigator.geolocation.getCurrentPosition(
      (posicao) => {
        let data = new Date()
        let estacao = this.obterEstacao(data, posicao.coords.latitude)
        let icone = this.icones[estacao]
        this.setState({
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude,
          estacao: estacao,
          data: data.toLocaleDateString(),
          icone: icone
        })
      },
      (err) => {
        this.setState({
          mensagemDeErro: "Tente novamente mais tarde"
        })
      }
    )
  }
  
  render(){
    return (
      //.container.mt-2
      <div className="container mt-2">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <div 
                  className="d-flex align-items-center border rounded mb-2"
                  style={{height: '6rem'}}>
                    <i className={`fas fa-5x ${this.state.icone}`}></i>
                    <p className='w-75 ms-3 text-center fs-1'>{this.state.estacao}</p>
                </div>
                <p className="text-center">
                  {/* Renderização condicional */}
                  {
                    // condicao? v1 : v2
                    this.state.latitude != null ? `Coordenadas ${this.state.latitude}, ${this.state.longitude}. Data: ${this.state.data}` 
                    : this.state.mensagemDeErro != null ? `${this.state.mensagemDeErro}`
                    : `Clique no botão para saber sua estação climática` 
                  }
                </p>
              </div>
              <button 
                className="btn btn-outline-primary w-100 mt-2"
                onClick={this.obterLocalizacao}>
                Qual a minha estação?
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
)