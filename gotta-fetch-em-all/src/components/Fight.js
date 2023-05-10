import React, { useState, useEffect, useCallback } from "react";

const Fight = ({ enemyHp, setEnemyHp, enemyAttack, enemyDefense, userHp, setUserHp, userAttack, userDefense }) => {
  const [phase, setPhase] = useState("User Attack")
  const [isFightOver, setIsFightOver] = useState(false)
  const [hasFightStarted, setHasFightStarted] = useState(false);

  const calculateDamage = (enemyAttack, userDefense) => {
    const B = enemyAttack;
    const D = userDefense;
    const Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
    return ((((2 / 5 + 2) * B * 60 / D) / 50) + 2) * Z / 255;
  }

  const enemyAttackUser = useCallback(() => {
    const newHp = Math.round(userHp - calculateDamage(enemyAttack, userDefense));
    setUserHp(newHp >= 0 ? newHp : 0)
    if (newHp <= 0) setIsFightOver(true)
  }, [setUserHp, userHp, enemyAttack, userDefense]);

  const userAttackEnemy = useCallback(() => {
    const newEnemyHp = Math.round(enemyHp - calculateDamage(userAttack, enemyDefense));
    setEnemyHp(newEnemyHp >= 0 ? newEnemyHp : 0)
    if (newEnemyHp <= 0) setIsFightOver(true)
  }, [setEnemyHp, enemyHp, userAttack, enemyDefense]);

  useEffect(() => {
    let timeoutId;
    if (!isFightOver) {
      if (phase === "Enemy Attack") {
        timeoutId = setTimeout(() => {
          enemyAttackUser()
          setPhase("User Attack")
        }, 1000);
      } else if (phase === "User Attack") {
        timeoutId = setTimeout(() => {
          userAttackEnemy()
          setPhase("Enemy Attack")
        }, 1000);
      }
    }
    return () => clearTimeout(timeoutId)
  }, [phase, isFightOver, enemyAttackUser, userAttackEnemy])

  function startFight() {
    setHasFightStarted(true)
    if (!isFightOver) {
      userAttackEnemy()
      setPhase("Enemy Attack")
    }
  }

  return (
    <>
      {hasFightStarted ? null : <button onClick={startFight} disabled={isFightOver}>Start Fight!</button>}
    </>
  )
}
export default Fight;
