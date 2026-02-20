import React from "react";
import styles from "./About.module.css";

import side from "../../Image/imageAbout/Side.png";

import services from "../../Image/imageAbout/Services.png";
import services1 from "../../Image/imageAbout/Services1.png";
import services2 from "../../Image/imageAbout/Services2.png";
import services3 from "../../Image/imageAbout/Services3.png";

const infoPanelItems = [
  { id: 1, quantity: "10k", text: "Sallers active our site", img: services },
  { id: 2, quantity: "33k", text: "Mopnthly Produduct Sale", img: services1 },
  {
    id: 3,
    quantity: "45k",
    text: "Customer active in our site",
    img: services2,
  },
  {
    id: 4,
    quantity: "25k",
    text: "Anual gross sale in our site",
    img: services3,
  },
];

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.infoBlock}>
        <div className={styles.left}>
          <div className={styles.title}> Our Story</div>
          <div className={styles.subtitle}>
            Launced in 2015, PickNNBuy is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, PickNNBuy
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </div>
          <div className={styles.subtitle}>
            PickNNBuy has more than 1 Million products to offer, growing at a
            very fast. PickNNBuy offers a diverse assotment in categories
            ranging from consumer.
          </div>
        </div>
        <div className={styles.right}>
          <img src={side} alt="side" />
        </div>
      </div>

      <div className={styles.infoPanel}>
        <div className={styles.infoPanelList}>
          {infoPanelItems.map((item) => (
            <div key={item.id} className={styles.infoPannelItem}>
              <div>
                <img src={item.img} alt="item" className={styles.itemImg} />
              </div>
              <div className={styles.itemQuantity}>{item.quantity}</div>
              <div className={styles.itemText}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default About;
