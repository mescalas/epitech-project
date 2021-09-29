import React from "react";
import Reviews from "./Reviews";

const Tabs = ({ product, color, description, characteristics, reviews }) => {

  const [openTab, setOpenTab] = React.useState(1);

  return (
    <>
      <div className="flex flex-wrap font-body">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-500"
                    : "text-" + color + "-500 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
              Description
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-500"
                    : "text-" + color + "-500 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
              Fiche technique
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + color + "-500"
                    : "text-" + color + "-500 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
              Avis
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded text-justify">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <p>
                   {description}
                  </p>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  {characteristics ?  
                    <div className="">{Object.entries(characteristics).map(([key, characteristic], i) => (
                      <div className="flex border-t border-gray-200 py-2" key={i}>
                      <p className="text-gray-500" key={key}>{key}</p>
                      <p className="ml-auto text-gray-900" key={characteristic}>{characteristic}</p> 
                    </div>   
                    ))} 
                    </div> : <p>Loading</p>}
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <Reviews
                  reviews={reviews}
                  product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;