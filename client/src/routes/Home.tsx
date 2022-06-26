import React from "react";
import { useGlobalContext } from "../context/GlobalCryptoContext";
import { CryptoCard } from "../components/Home/CryptoCard";
import { Crypto, SortFilterOptions } from "../data/models";
import { useState, useEffect } from "react";
import {
  processFilterSortOptions,
  replaceUpdatedCrypto,
} from "../data/helpers";
import { SortFilterBar } from "../components/Home/SortFilterBar";
import { updateSingleCrypto } from "../data/api";

export const Home = () => {
  const { cryptos, user, togglePageLoading, setUser } = useGlobalContext();
  const [organizedCryptos, setOrganizedCryptos] = useState<Crypto[]>([]);
  const [sortFilterOptions, setSortFilterOptions] = useState<SortFilterOptions>(
    { sort: "popular", filter: "none" }
  );

  useEffect(() => {
    togglePageLoading();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (cryptos.length) {
      togglePageLoading();
      setOrganizedCryptos(cryptos);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptos]);

  useEffect(() => {
    setOrganizedCryptos(
      processFilterSortOptions(
        cryptos,
        sortFilterOptions,
        user ? user.portfolio : [],
        user ? user.bookmarks : []
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortFilterOptions, user?.bookmarks]);

  const handleUpdateSingleCrypto = async (name: string) => {
    togglePageLoading();
    try {
      const updatedCrypto = await updateSingleCrypto(name);
      setOrganizedCryptos((prevState) => {
        return replaceUpdatedCrypto(prevState, updatedCrypto);
      });
      togglePageLoading();
    } catch (error) {
      togglePageLoading();
      alert("Error updating crypto");
    }
  };

  return (
    <div className="Home">
      <SortFilterBar
        setSortFilterOptions={setSortFilterOptions}
        loggedIn={user ? true : false}
      />
      <div className="cryptosContainer">
        {organizedCryptos.map((crypto) => {
          return (
            <CryptoCard
              key={crypto.ticker}
              crypto={crypto}
              user={user}
              handleUpdateSingleCrypto={handleUpdateSingleCrypto}
              setUser={setUser}
              togglePageLoading={togglePageLoading}
              bookmarks={user ? user.bookmarks : []}
            />
          );
        })}
      </div>
    </div>
  );
};
