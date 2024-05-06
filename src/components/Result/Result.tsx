import React from "react";
import classes from "./Result.module.css";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { IoMdPerson } from "react-icons/io";
import { IoBagSharp } from "react-icons/io5";
import { Tooltip } from "@mui/material";
import {
  DisplayFirstClassDetail,
  DisplayOffer,
  DisplayVanDetail,
} from "../../services/locationService.type";

type ResultProps = {
  tourDetails: DisplayOffer;
};
const Result: React.FC<ResultProps> = ({ tourDetails }) => {
  return (
    <>
      <h2 className={classes.txtcenter}>
        Here's your Sixt Limousine service first class and van offers.
      </h2>
      <div className={classes.container}>
        {tourDetails &&
          tourDetails.firstClassVehicleList.map(
            (item: DisplayFirstClassDetail) => {
              return (
                <>
                  <div className={`${classes.fl} ${classes.box}`}>
                    <div className={classes.flex}>
                      <img
                        className={classes.imgWH}
                        src={item.vehicleImage}
                        alt=""
                      />
                      <div className={classes.marT10}>{item.amount}</div>
                    </div>
                    <div className={classes.mar10}>
                      {item.vehicleClass} {item.vehicleCategory}
                      <div className={classes.icon}>
                        <Tooltip title={<span style={{ fontSize: "12px", color: "white" }}>{item.vehicleBenefits? item.vehicleBenefits : "Currently no benefits are there for this."}</span>}>
                          <LocalOfferIcon fontSize="small" />
                        </Tooltip>
                      </div>
                    </div>
                    <div className={`${classes.blue} ${classes.mar10}`}>
                      {item.vehicleDescription}
                    </div>
                    <div className={classes.mar10}>
                      <IoBagSharp /> {item.noOfBaggage}
                      <span>
                        {" "}
                        <IoMdPerson />
                        {item.noOfPassengers}
                      </span>
                    </div>
                  </div>
                </>
              );
            }
          )}
        {tourDetails &&
          tourDetails.vanList.map((item: DisplayVanDetail) => {
            return (
              <>
                <div className={`${classes.fl} ${classes.box}`}>
                    <div className={classes.flex}>
                      <img
                        className={classes.imgWH}
                        src={item.vanImage}
                        alt=""
                      />
                      <div className={classes.marT10}>{item.amount}</div>
                    </div>
                    <div className={classes.mar10}>
                      {item.vanClass} {item.vanCategory}
                      <div className={classes.icon}>
                        <Tooltip title={<span style={{ fontSize: "12px", color: "white"}}>{item.vanBenefits? item.vanBenefits : "Currently no benefits are there for this."}</span>}>
                          <LocalOfferIcon fontSize="small" />
                        </Tooltip>
                      </div>
                    </div>
                    <div className={`${classes.blue} ${classes.mar10}`}>
                      {item.vanDescription}
                    </div>
                    <div className={classes.mar10}>
                      <IoBagSharp /> {item.noOfBaggage}
                      <span>
                        {" "}
                        <IoMdPerson />
                        {item.noOfPassengers}
                      </span>
                    </div>
                  </div>
              </>
            );
          })}
      </div>
    </>
  );
};
export default Result;
