import React, { useState, useEffect } from "react";
import web3 from "./web3";
import lottery from "./lottery";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
 
function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
 
  useEffect(() => {
    async function fetchData() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
 
      setManager(manager);
      setPlayers(players);
      setBalance(balance);
    }
 
    fetchData();
  }, []);
 
  async function handleSubmit(event) {
    event.preventDefault();
 
    const accounts = await web3.eth.getAccounts();
 
    setMessage("Waiting on transaction success...");
 
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(value, "ether"),
    });
 
    setMessage("You have been entered!");
  }
 
  async function handleClick() {
    const accounts = await web3.eth.getAccounts();~~
    setMessage("Waiting on transaction success...");
 
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
 
    setMessage("A winner has been picked!");
  }
 
  return (
    <div>
{/* tailwind */}
<div class="container mx-auto">
<div class="flex items-center justify-center h-screen">
<form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Lottery Contract</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Managed by {manager}</p>
          <p className="mt-1 text-sm leading-6 text-gray-600">currently {players.length}people </p>
          <p className="mt-1 text-sm leading-6 text-gray-600">competing to win {web3.utils.fromWei(balance, "ether")} ether!</p>
          <p className="mt-1 text-sm leading-6 text-gray-600"> {message}</p>
          <p className="mt-1 text-sm leading-6 text-gray-600"> Boom1{message}</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Enter Amount of ether to enter
              </label>
              <div className="mt-2">
                <input
                  id="number"
                  name="number"
                  type="number"
                  autoComplete="email"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            

          </div>
          
          <div className="mt-10  grid-cols-1  gap-y-8 sm:grid-cols-6 flex items-center justify-start gap-x-6">
      <button
          type="submit"
          onClick={handleClick}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Enter to Lottery
        </button>

        <button
          type="submit"
          onClick={handleClick}
          className="rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Pick a winner!
        </button>
      </div>

        </div>
        </div>
     
     
    </form>
</div>
</div>
{/* end tailwind */}


      {/* <h2>Lottery Contract</h2>

      <p>
        This contract is managed by {manager}. There are currently{" "}
        {players.length} people entered, competing to win{" "}
        {web3.utils.fromWei(balance, "ether")} ether!
      </p>
 
      <hr />
      <form onSubmit={handleSubmit}>
        <h4>Want to try your luck?</h4>
        <div>
          <label>Amount of ether to enter</label>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <button>Enter</button>
      </form>
 
      <hr />
 
      <h4>Ready to pick a winner?</h4>
      <button onClick={handleClick}>Pick a winner!</button>
 
      <hr />
 
      <h1>{message}</h1> */}
    </div>
  );
}
 
export default App;