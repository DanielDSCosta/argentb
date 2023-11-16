import chat from "../components/img/icon-chat.png";
import money from "../components/img/icon-money.png";
import security from "../components/img/icon-security.png";

export const Hero = () => {
  return (
    <div className="hero">
      <section className="hero-content">
        <h2 className="sr-only">Promoted Content</h2>
        <p className="subtitle">No fees.</p>
        <p className="subtitle">No minimum deposit.</p>
        <p className="subtitle">High interest rates.</p>
        <p className="text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
  );
};

export const Feature = ({ iconSrc, title, description }) => {
  return (
    <div className="feature-item">
      <img src={iconSrc} alt="Chat Icon" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export const FEATURES = [
  {
    iconSrc: [chat],
    title: "You are our #1 priority",
    description: `Need to talk to a representative? You can get in touch through our
    24/7 chat or through a phone call in less than 5 minutes.`,
  },
  {
    iconSrc: [money],
    title: "More savings means higher rates",
    description: `The more you save with us, the higher your interest rate will be!`,
  },
  {
    iconSrc: [security],
    title: "Security you can trust",
    description: `We use top of the line encryption to make sure your data and money is
    always safe.`,
  },
];

export const Features = () => {
  return (
    <section className="features">
      <h2 className="sr-only">Features</h2>
      {FEATURES.map((feature) => (
        <Feature key={feature.title} {...feature} />
      ))}
    </section>
  );
};

export const Index = () => {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
};
