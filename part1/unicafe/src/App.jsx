import { useState } from "react";

const Title = ({ title }) => <h2>{title}</h2>;

const Button = ({ handlerClick, text }) => (
  <button onClick={handlerClick}>{text}</button>
);

const Total = ({ position, count }) => (
  <tr>
    <td scope="col">{position}</td>
    <td scope="col">{count}</td>
  </tr>
);

const Buttons = ({ text, ...onHadlers }) => {
  return (
    <>
      <Button text={text.titles[0]} handlerClick={onHadlers.goodHandler} />
      <Button text={text.titles[1]} handlerClick={onHadlers.neutralHandler} />
      <Button text={text.titles[2]} handlerClick={onHadlers.badHandler} />
    </>
  );
};

const TotalStatisticByEachPosition = ({ text, ...stats }) => {
  return (
    <>
      <Total position={text.titles[0]} count={stats.good} />
      <Total position={text.titles[1]} count={stats.neutral} />
      <Total position={text.titles[2]} count={stats.bad} />
    </>
  );
};

const CalculatedStatistic = ({ text, ...total }) => {
  const totalCount = total.good + total.neutral + total.bad;
  return (
    <>
      <tr>
        <td>{text.statisticsTitles[0]}</td>
        <td>{totalCount}</td>
      </tr>
      <tr>
        <AverageCalculation
          text={text.statisticsTitles[1]}
          total={total}
          totalCount={totalCount}
        />
      </tr>
      <tr>
        <PositiveCalculation
          text={text.statisticsTitles[2]}
          good={total.good}
          totalCount={totalCount}
        />
      </tr>
    </>
  );
};

const AverageCalculation = ({ text, total, totalCount }) => {
  {
    if (totalCount === 0) {
      return (
        <>
          <td>{text}</td>
          <td>{totalCount}</td>
        </>
      );
    } else {
      return (
        <>
          <td>{text}</td>
          <td>{(total.good - total.bad) / totalCount}</td>
        </>
      );
    }
  }
};

const PositiveCalculation = ({ text, good, totalCount }) => {
  if (totalCount === 0) {
    return (
      <>
        <td>{text} </td>
        <td>0%</td>
      </>
    );
  } else {
    return (
      <>
        <td>{text}</td>
        <td>{(good / totalCount) * 100}%</td>
      </>
    );
  }
};

const Statistics = ({ text, good, neutral, bad }) => {
  return (
    <table>
      <tbody>
        <TotalStatisticByEachPosition
          text={text}
          good={good}
          neutral={neutral}
          bad={bad}
        />
        <CalculatedStatistic
          text={text}
          good={good}
          neutral={neutral}
          bad={bad}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  const title = ["give feedback", "statistics"];
  const text = {
    titles: ["good", "neutral", "bad"],
    statisticsTitles: ["all", "average", "positive"],
  };
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedbackHandler = () => {
    setGood(good + 1);
  };

  const neutralFeedbackHandler = () => {
    setNeutral(neutral + 1);
  };

  const badFeedbackHandler = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Title title={title[0]} />
      <div>
        <Buttons
          text={text}
          goodHandler={goodFeedbackHandler}
          neutralHandler={neutralFeedbackHandler}
          badHandler={badFeedbackHandler}
        />
      </div>
      <Title title={title[1]} />
      <div>
        <Statistics text={text} good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
};

export default App;
