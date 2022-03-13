import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';


type FormData = {
  login: string;
};

type Profile =
{
  url: string;
  name: string;
  followers: string;
  location: string;
  avatar_url: string;
};

const CepSearch = () => {


  const [profile, setProfile] = useState<Profile>();
  const [formData, setFormData] = useState<FormData>({
    login: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  axios
      .get(`https://api.github.com/users/${formData?.login}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        setProfile(undefined);
      });
  };

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Encontre um perfil Github</h1>
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="login"
              value={formData?.login}
              className="search-input"
              placeholder="Usuário Github"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>

        {profile && (
          <>
        <ResultCard title="Perfil: " description={profile.url} />
        <ResultCard title="Seguidores: " description={profile.followers} />
        <ResultCard title="Localidade: " description={profile.location} />
        <ResultCard title="Nome: " description={profile.name} />
        <div className="card-top-container">
                <img src={profile.avatar_url} alt="Foto" />
            </div>
        </> 
        )}
      </div>
    </div>
  );
};

export default CepSearch;
