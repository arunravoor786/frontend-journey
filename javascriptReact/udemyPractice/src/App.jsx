import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';    
import componentsImg from './assets/components.png';
import './App.css';

const reactDescription = ['Fundamental', 'Crucial', 'Core']

function getrandomDescription() {
  const randomIndex = Math.floor(Math.random() * reactDescription.length);
  return reactDescription[randomIndex];

function Header() {
  return (
    <header>
        <img src="src/assets/react-core-concepts.png" alt="Stylized atom" />
        <h1>React Essentials</h1>
        <p>
          {getrandomDescription()} Fundamental React concepts you will need for almost any app you are
          going to build!
        </p>
      </header>

  );
}

/*function CoreConcepts(props) {
  return (
    <li>
      <img src={props.img} alt={props.title} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}*/

function App() {
  return (
    <div>
      <main>
        <section id="core-concepts"></section>
        <h2>Core CoreConcepts</h2>
        <ul>
          <CoreConcepts title="Components" 
          description="The core UI building block." img={componentsImg} />
          <CoreConcepts />
          <CoreConcepts />
        </ul>
      
      </main>
    </div>
  );
}

export default App;
