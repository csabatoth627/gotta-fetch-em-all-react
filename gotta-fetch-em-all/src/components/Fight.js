import React, { useState, useEffect } from "react";

const Fight = ({ enemyHp, setEnemyHp, enemyAttack, enemySetAttack, enemyDefense, enemySetDefense, userHp, setUserHp, userAttack, userDefense}) => {
    const [phase, setPhase] = useState("User Attack")


    useEffect(() => {
        let timeoutId;
        if (phase === "Enemy Attack") {
            timeoutId = setTimeout(() => {
                enemyAttackUser()
                setPhase("User Attack")
            }, 1000);
        }
        return ()=> {
            clearTimeout(timeoutId)
        }
    }, [phase])


    function enemyAttackUser() {
        const fightFormula = ((((2 / 5 + 2) * enemyAttack / userDefense) / 50) + 2) * 230 / 255
        console.log(enemySetAttack);
        setUserHp(Math.round(userHp - fightFormula))
    }

    function UserAttack() {
        if (phase === "User Attack") {
            const fightFormula = ((((2 / 5 + 2) * userAttack / enemyDefense) / 50) + 2) * 230 / 255
            console.log(fightFormula);
            setEnemyHp(Math.round(enemyHp - fightFormula))
            setPhase("Enemy Attack")
        }



    }

    return (
        <button onClick={UserAttack}>Attack!</button>

    )


}

export default Fight;