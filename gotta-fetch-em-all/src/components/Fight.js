import React, { useState, useEffect, useCallback } from "react";


function Fight({ enemyHp, setEnemyHp, enemyAttack, enemyDefense, userHp, setUserHp, userAttack, userDefense, enemyPokemon, onBack, setUpdatePokemon, usersPokemon, updatePokemon, userPokemonName }) {
  const [phase, setPhase] = useState("")
  const [isFightOver, setIsFightOver] = useState(false)
  const [hasFightStarted, setHasFightStarted] = useState(false);
  const [winner, setWinner] = useState(null);

  const calculateDamage = (attack, defense) => {
    const B = attack;
    const D = defense;
    const Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
    return ((((2 / 5 + 2) * B * 60) / D) / 50 + 2) * Z / 255;
  };

  const enemyAttackUser = useCallback(() => {
    const newHp = Math.round(userHp - calculateDamage(enemyAttack, userDefense));
    setUserHp(newHp >= 0 ? newHp : 0);
    if (newHp <= 0) {
      setIsFightOver(true);
      setWinner("Enemy");
    }
  }, [setUserHp, userHp, enemyAttack, userDefense]);

  const userAttackEnemy = useCallback(() => {
    const newEnemyHp = Math.round(enemyHp - calculateDamage(userAttack, enemyDefense));
    setEnemyHp(newEnemyHp >= 0 ? newEnemyHp : 0);
    if (newEnemyHp <= 0) {
      setIsFightOver(true);
      setWinner("User");
    }
  }, [setEnemyHp, enemyHp, userAttack, enemyDefense]);

  useEffect(() => {
    let timeoutId;
    if (!isFightOver) {
      if (phase === "Enemy Attack") {
        timeoutId = setTimeout(() => {
          enemyAttackUser();
          setPhase("User Attack");
        }, 500);
      } else if (phase === "User Attack") {
        timeoutId = setTimeout(() => {
          userAttackEnemy();
          setPhase("Enemy Attack");
        }, 500);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [phase, isFightOver, enemyAttackUser, userAttackEnemy]);

  const startFight = () => {
    setHasFightStarted(true);
    if (!isFightOver) {
      userAttackEnemy();
      setPhase("Enemy Attack");
    }
  };

  const capturePokemon = () => {

    if (updatePokemon) {
      setUpdatePokemon([...updatePokemon, enemyPokemon])
      onBack()
    } else {
      setUpdatePokemon([...usersPokemon, enemyPokemon])
      onBack()
    }


  }

  return (
    <>
      {hasFightStarted ? null : (
        <button onClick={startFight} disabled={isFightOver} id="fight-button">
          Let's GO!
        </button>
      )}
      {isFightOver && (
        <div>
          {winner === "User" ? (
            <>
              <h2 id="winner-text">Winner: {userPokemonName}</h2>
              <button onClick={capturePokemon}>Back to location selection</button>
            </>
          ) : (
            <>
              <h2>You lose, choose more wisely next time</h2>
              <button onClick={onBack}>Back to location selection</button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Fight;

