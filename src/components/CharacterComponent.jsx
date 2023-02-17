import styles from "./CharacterAvatar.module.css";

const CharacterComponent = ({ character }) => {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <p>{character.name}</p>
        <p>Gender: {character.gender}</p>
        <p>
          Species: {character.species} {character.type && `, ${character.type}`}
        </p>
        <p>Origin: {character.origin.name}</p>
        <p>{character.status}</p>
      </div>

      <img src={character.image} alt="" />
    </div>
  );
};

export default CharacterComponent;
