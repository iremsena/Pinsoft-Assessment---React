import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import personData from "./person-list.json";

function CardComponent() {
  const [personDataArray, setPersonDataArray] = useState(personData);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  //personDataArray değiştikçe componenti yenilemek için.
  useEffect(() => {}, [personDataArray, searchResults]);
  const deleteUser = (email) => {
    setPersonDataArray((personDataArray) =>
      personDataArray.filter((f) => f.email != email)
    );
  };
  const findUser = () => {
    //eğer değeri bulamazsa -1 değeri verdiği için >= 0 kontrolü yapıldı.
    searchTerm
      ? setSearchResults(
          personDataArray.filter(
            (f) => f.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
          )
        )
      : setSearchResults(null);
  };
  return (
    <>
      <p className="personsListText">
        <b>Kişi Listesi</b>
      </p>
      <div>
        <input
          className="searchBar"
          type="text"
          placeholder="Ad Soyad"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton" onClick={() => findUser()}>
          Ara
        </button>
      </div>
      {searchResults
        ? searchResults.map((data) => {
            return (
              <div className="person-container">
                <div> Ad Soyad : {data.name}</div>
                <div> Telefon Numarası : {data.phone}</div>
                <div> Email : {data.email}</div>
                <button onClick={() => deleteUser(data.email)}>
                  Kişiyi Sil
                </button>
              </div>
            );
          })
        : personDataArray.map((data) => {
            return (
              <div className="person-container">
                <div> Ad Soyad : {data.name}</div>
                <div> Telefon Numarası : {data.phone}</div>
                <div> Email : {data.email}</div>
                <button
                  className="deleteUser"
                  onClick={() => deleteUser(data.email)}
                >
                  Kişiyi Sil
                </button>
              </div>
            );
          })}
    </>
  );
}

export default CardComponent;
