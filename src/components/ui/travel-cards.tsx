import { Carousel, Card } from "@/components/ui/cards-carousel";
import SG from "/travel/sg.jpg";
import SL from "/travel/sl.jpg";
import PL from "/travel/pl.jpg";
import SV from "/travel/sv.jpg";
import AU from "/travel/au.jpg";
import CZ from "/travel/cz.jpg";
import HU from "/travel/hu.jpg";

export default function TravelCards() {
  const cards = data.map((card, index) => (
    <Card key={card.title} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full text-center">
      <div className="mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          Places I have <span className="gradient-text">travelled</span> to
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Every new place, every new culture, every new people - just makes me realise how big the world is and how much more there is to explore.
        </p>
      </div>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(1).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <h1 className="font-bold text-2xl text-neutral-700 dark:text-neutral-200 text-center mb-2">
              Travelling keeps your soul young.
            </h1>{" "}
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl max-w-3xl mx-auto text-justify">
              Every new place you visit, every new culture you experience, every
              new person you meet, every new food you taste, every new language
              you learn, every new adventure you embark on, every new memory you
              create, every new story you share, every new experience you gain,
              every new lesson you learn, every new perspective you see, every
              new emotion you feel, every new moment you live, every new journey
              you take, every new dream you chase, every new goal you achieve,
              every new challenge you face, every new fear you conquer, every
              new obstacle you overcome, every new success you celebrate, every
              new failure you learn from, every new relationship you build,
              every new connection you make, every new bond you form, every new
              friendship you cherish, every new love you find, every new heart
              you touch, every new life you change, every new world you explore,
              every new universe you create, every new reality you live, every
              new you you become.
            </p>
            {/* <Image
              src={"https://assets.aceternity.com/macbook.png"}
              alt="Photo of the place"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            /> */}
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: "JAN 2022",
    title: "Singapore",
    src: SG,
    content: <DummyContent />,
  },
  {
    category: "JUN 2022",
    title: "Sri Lanka",
    src: SL,
    content: <DummyContent />,
  },
  {
    category: "SEP 2023",
    title: "Poland",
    src: PL,
    content: <DummyContent />,
  },

  {
    category: "SEP 23",
    title: "Slovakia",
    src: SV,
    content: <DummyContent />,
  },
  {
    category: "OCT 2023",
    title: "Austria",
    src: AU,
    content: <DummyContent />,
  },
  {
    category: "OCT 2023",
    title: "Czech Republic",
    src: CZ,
    content: <DummyContent />,
  },
  {
    category: "NOV 2023",
    title: "Hungary",
    src: HU,
    content: <DummyContent />,
  },
];
