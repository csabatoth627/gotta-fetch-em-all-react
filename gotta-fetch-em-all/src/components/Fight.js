import React, { useState, useEffect, useCallback } from "react";

const Fight = ({ enemyHp, setEnemyHp, enemyAttack, enemySetAttack, enemyDefense, enemySetDefense, userHp, setUserHp, userAttack, userDefense }) => {
  const [phase, setPhase] = useState("User Attack")

  const calculateDamage = (enemyAttack, userDefense) => {
    const B = enemyAttack;
    const D = userDefense;
    const Z = Math.floor(Math.random() * (255 - 217 + 1)) + 217;
    return ((((2 / 5 + 2) * B * 60 / D) / 50) + 2) * Z / 255;
  }

  const enemyAttackUser = useCallback(() => {
    setUserHp(Math.round(userHp - calculateDamage(enemyAttack, userDefense)))
  }, [setUserHp, userHp, enemyAttack, userDefense]);

  useEffect(() => {
    let timeoutId;
    if (phase === "Enemy Attack") {
      timeoutId = setTimeout(() => {
        enemyAttackUser()
        setPhase("User Attack")
      }, 1000);
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [enemyAttackUser, phase])


  function UserAttack() {
    if (phase === "User Attack") {
      setEnemyHp(Math.round(enemyHp - calculateDamage(userAttack, enemyDefense)))
      setPhase("Enemy Attack")
    }
  }

  return (
    <button onClick={UserAttack}>Attack!</button>
  )
}

export default Fight;