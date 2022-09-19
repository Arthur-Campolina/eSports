import { GameBanner } from "./components/gameBanner";
import "./styles/main.css";
import logoImg from "./assets/logo.svg";
import { CreateAdBanner } from "./components/createAdBanner";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { GameController } from "phosphor-react";
import { Input } from "./components/Form/input";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGames(data);
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto my-20 flex flex-col items-center">
      <img src={logoImg} />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        <GameBanner
          title="L3ague of Legends"
          bannerUrl="./image 1.png"
          adsCount={5}
        />
        <GameBanner title="Dota 2" bannerUrl="./image 2.png" adsCount={12} />
        <GameBanner title="CS:GO" bannerUrl="./image 3.png" adsCount={5} />
        <GameBanner
          title="Apex Legends"
          bannerUrl="./image 5.png"
          adsCount={3}
        />
        <GameBanner title="Fortnite" bannerUrl="./image 6.png" adsCount={9} />
        <GameBanner
          title="World of Warcraft"
          bannerUrl="./image 7.png"
          adsCount={2}
        />
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
            <Dialog.Title className="text-3xl font-black">
              Publique um anúncio
            </Dialog.Title>
            <form className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="game" className="font-semibold">
                  Qual o game?
                </label>
                <Input
                  id="game"
                  placeholder="Selecione o game que deseja jogar"
                />
              </div>
              <div className="flex flex-col gap-2 ">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" placeholder="Como te chamam dentro do game" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input
                    id="yearsPlaying"
                    type="number"
                    placeholder="Tudo bem ser ZERO"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual seu discord?</label>
                  <Input id="discord" placeholder="Usuario#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="">Quando costuma jogar?</label>
                  <div className="grid grid-cols-4 gap-1">
                    <button
                      title="Domingo"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      D
                    </button>

                    <button
                      title="Segunda"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </button>

                    <button
                      title="Terça-Feira"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      T
                    </button>

                    <button
                      title="Quarta-Feira"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      Q
                    </button>

                    <button
                      title="Quinta-Feira"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      Q
                    </button>

                    <button
                      title="Sexta-Feira"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </button>

                    <button
                      title="Sábado"
                      className="w-8 h-8 rounded bg-zinc-900"
                    >
                      S
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" id="hourStart" placeholder="De" />
                    <Input type="time" id="hourEnds" placeholder="Até" />
                  </div>
                </div>
              </div>
              <div className="mt-2 flex gap-2 text-sm">
                <Input type="checbox" />
                Constumo me conectar ao chat de voz
              </div>
              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-700"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  <GameController size={24} />
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
export default App;
