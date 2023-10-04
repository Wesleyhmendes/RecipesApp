import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './style.module.css';
import profilePhoto from '../../assets/Icons/profile-photo.svg';
import goBackButton from '../../assets/Icons/go-back-icon.svg';
import doneRecipesIcon from '../../assets/Icons/yellow-check-circle.svg';
import favoriteRecipesIcon from '../../assets/Icons/yellow-circle-heart.svg';
import loGoutIcon from '../../assets/Icons/log-out.svg';

export default function Profile() {
  const [userEmail, setUserEmail] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user') as string);
      if (email) setUserEmail(email);
    }
  }, []);

  const manyFavoritesJSON = localStorage.getItem('favoriteRecipes');
  const manyFavorites = JSON.parse(manyFavoritesJSON as string).length;

  const manyProgressJSON = localStorage.getItem('inProgressRecipes');
  const manyProgress = JSON.parse(manyProgressJSON as string).length;

  const manyDonesJSON = localStorage.getItem('doneRecipes');
  const manyDones = JSON.parse(manyDonesJSON as string).length;

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <main className={ `${style.ProfilePageMain} ${style.profilePage}` }>
      <button onClick={ handleGoBack } className={ style.ProfilePageGoBackBtn }>
        <img
          className={ style.ProfilePageGoBackImg }
          src={ goBackButton }
          alt="voltar"
        />
      </button>
      <img
        className={ style.ProfilePageProfilePic }
        src={ profilePhoto }
        alt="foto de perfil"
      />
      <p
        className={ style.ProfilePageEmail }
        data-testid="profile-email"
      >
        { userEmail }
      </p>
      <div className={ style.ProfilePageRecipesProgressDiv }>
        <div className={ style.ProfilePageRecipesProgressDivInProgress }>
          <p className={ style.ProfilePageRecipesProgressNumber }>
            { manyProgress || 0 }
          </p>
          <p className={ style.ProfilePageRecipesProgressText }>Em progresso</p>
        </div>
        <div className={ style.ProfilePageRecipesProgressDivFavorites }>
          <p className={ style.ProfilePageRecipesProgressNumber }>
            { manyFavorites || 0 }
          </p>
          <p className={ style.ProfilePageRecipesProgressText }>Favoritas</p>
        </div>
        <div className={ style.ProfilePageRecipesProgressDivDones }>
          <p className={ style.ProfilePageRecipesProgressNumber }>
            { manyDones || 0 }
          </p>
          <p className={ style.ProfilePageRecipesProgressText }>Prontas</p>
        </div>
      </div>
      <section className={ style.ProfilePageWhiteSection }>
        <div className={ style.ProfilePageLinksDiv }>
          <Link
            className={ style.ProfilePageLinksLink }
            data-testid="profile-done-btn"
            to="/done-recipes"
          >
            <img src={ doneRecipesIcon } alt="Receitas prontas" />
            <p className={ style.ProfilePageLinksP }>
              Done Recipes
            </p>
          </Link>
          <Link
            className={ style.ProfilePageLinksLink }
            data-testid="profile-favorite-btn"
            to="/favorite-recipes"
          >
            <img src={ favoriteRecipesIcon } alt="Receitas favoritas" />
            <p className={ style.ProfilePageLinksP }>
              Favorite Recipes
            </p>
          </Link>
          <Link
            className={ style.ProfilePageLinksLink2 }
            data-testid="profile-logout-btn"
            to="/"
            onClick={ () => { localStorage.clear(); } }
          >
            <img src={ loGoutIcon } alt="Sair" />
            <p className={ style.ProfilePageLinksP }>
              Logout
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
