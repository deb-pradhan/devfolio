import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  const serverUrl = "https://ncqawy7nybsq.usemoralis.com:2053/server";
      const appId = "nGgpQ23BTzIiV7AqMGSBTXWFNBWfSbZX7aMY1to6";
      Moralis.start({ serverUrl, appId });

      async function login() {
        let user = Moralis.User.current();
        if (!user) {
          user = await Moralis.Web3.authenticate();
        }
        console.log("logged in user:", user);
        getStats();
      }

      async function logOut() {
        await Moralis.User.logOut();
        console.log("logged out");
      }

      // bind button click handlers
      document.getElementById("btn-login").onclick = login;
      document.getElementById("btn-logout").onclick = logOut;
      document.getElementById("btn-get-stats").onclick = getStats;

      function getStats() {
        const user = Moralis.User.current();
        if (user) {
          getUserTransactions(user);
        }
      }

      async function getUserTransactions(user) {
        // create query
        const query = new Moralis.Query("EthTransactions");
        query.equalTo("from_address", user.get("ethAddress"));

        // run query
        const results = await query.find();
        console.log("user transactions:", results);
      }

      //get stats on page load
      getStats();
  return (
    <div className={styles.container}>
      <h1>Moralis Gas Stats</h1>

<button id="btn-login">Moralis Login</button>
<button id="btn-logout">Logout</button>
<button id="btn-get-stats">Refresh Stats</button>

    </div>
  )
}
