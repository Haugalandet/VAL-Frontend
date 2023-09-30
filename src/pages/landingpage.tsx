import { Navbar } from "../components/navbar";
import { Publicpoll } from "../components/publicpoll";
import { Title } from "../components/title";

export function LandingPage() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <body>
        <Title />
        <Publicpoll />
      </body>
      <footer></footer>
    </>
  );
}
