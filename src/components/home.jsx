import React from "react";
import PageHeader from "./common/pageHeader";
const Home = () => {
  return (
    <section>
      <div className="container mt-5">
        <PageHeader titleText="Poker-Underdog" />
        <div className="row">
          <div className="col">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Assumenda aspernatur quae consectetur ea exercitationem eaque fuga
              accusantium eveniet veniam iste! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Necessitatibus inventore itaque
              laudantium officiis est eos quo sed iusto reprehenderit sequi
              consequatur vel voluptate laboriosam vero magni animi quas ipsam
              voluptatem, nam ut velit voluptatibus in suscipit. Cupiditate cum
              possimus voluptate, architecto beatae sed impedit ipsum rerum
              placeat aliquid. Quidem, repellendus.
            </p>
          </div>
          <div className="col">
            <img
              src="https://neconnected.co.uk/wp-content/uploads/2021/03/vcs_should_invest_like_poker_player-bf365a82-1280x640.jpg"
              alt=""
              style={{ height: 350, width: 350 }}
            />
            <img
              src="https://www.telegraph.co.uk/content/dam/betting/Better-Collective/8-Classic-xlarge.jpg"
              alt=""
              style={{ height: 350, width: 350 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
