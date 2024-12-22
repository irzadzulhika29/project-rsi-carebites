import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeDashboard from './pages/dashboard/HomeDashboard';
import ShareMeals from './pages/dashboard/sharemeals/ShareMeals';
import GrabMeals from './pages/dashboard/grabmeals/GrabMeals';
import CharityCampaign from './pages/dashboard/charitycampaign/CharityCampaign';
import BlogArtikel from './pages/dashboard/blogarticle/BlogArtikel';
import ShareYourActivity from './pages/dashboard/shareactivity/ShareYourActivity';
import ProductDetailPage from './components/dashboard/grabmeals/DetailProduct';
import HomeLanding from './pages/landing-page/HomeLanding';
import LoginPage from './pages/landing-page/LoginPage';
import RegistrationPage from './pages/landing-page/RegistartionPage';
import GrandProduct from './pages/dashboard/grabmeals/GrandProduct';
import CharityCampaignDetail from './components/dashboard/charitycampaign/CharityCampaignDetail';
import CharityCampaignForm from './pages/dashboard/charitycampaign/CharityCampaignForm';
import ArticleForm from './pages/dashboard/blogarticle/ArticleForm';
import Profile from './pages/dashboard/Profile';
import ArticleDetail from './pages/dashboard/blogarticle/ArticleDetail';
import PaymentMethod from './pages/dashboard/PaymentMethod';
import CharityTransaction from './pages/dashboard/charitycampaign/CharityTransaction';
import CartMeals from './pages/dashboard/cartmeals/CartMeals';
import ShareMealsForm from './pages/dashboard/sharemeals/ShareMealsForm'; //
import EditProfil from './pages/dashboard/EditProfil';
import UpdateShareMeals from './components/dashboard/sharemeals/UpdateShareMeals';


import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import CampaignVerif from './pages/dashboard/admin/charitycampaign/CampaignVerif';
import CampaignDetailVerif from './pages/dashboard/admin/charitycampaign/CampaignDetailVerif';
import BlogArticleVerif from './pages/dashboard/admin/blogartikel/BlogArticleVerif';
import ArticleVerifDetail from './pages/dashboard/admin/blogartikel/ArticleVerifDetail';
import AccountDetailVerif from './components/dashboard/admin/AccountDetailVerif';
import AccountList from './pages/dashboard/admin/AccountList';

import DashboardMitra from './pages/dashboard/mitra/DashboardMitra';
import ShareMealsMitra from './pages/dashboard/mitra/ShareMealsMitra';
import UpdateProductMitra from './pages/dashboard/mitra/UpdateProductMitra';
import ProfileMitra from './pages/dashboard/mitra/ProfileMitra';
import EditProfilMitra from './pages/dashboard/mitra/EditProfilMitra';
import ShareMealsFormMitra from './pages/dashboard/mitra/ShareMealsFormMitra';

import DashboardLS from './pages/dashboard/lembagasosial/DashboardLS';
import CharityCampaignLS from './pages/dashboard/lembagasosial/CharityCampaignLS';
import ProfileLS from './pages/dashboard/lembagasosial/ProfileLS';
import AccountVerifFormLS from './pages/dashboard/lembagasosial/AccountVerifFormLS';
import EditProfileLS from './pages/dashboard/lembagasosial/EditProfileLS';
import UpdateCharityLS from './pages/dashboard/lembagasosial/UpdateCharityLS';
import CreateCharityLS from './pages/dashboard/lembagasosial/CreateCharityLS';

import AccountVerifForm from './pages/dashboard/AccountVerifForm';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import Forbidden from './pages/Auth/Forbidden';
import PaymentMethodCharity from './pages/dashboard/PaymentMethodCharity';

const App = () => {

  const userData = JSON.parse(sessionStorage.getItem('user')) || {};
  return (
    <div>

      <Router>
        <Routes>
          <Route path="/regist" element={<RegistrationPage />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomeLanding />} />

          <Route element={<ProtectedRoute allowedRoles={['pengguna']} userRole={userData.role} />}>
          <Route path="/home" element={<HomeDashboard />} />
          <Route path="/share-meals" element={<ShareMeals />} />
          <Route path="/grab-meals" element={<GrabMeals />} />
          <Route path="/charity-campaign" element={<CharityCampaign />} />          
          <Route path="/blog" element={<BlogArtikel />} />
          <Route path="/share-activity" element={<ShareYourActivity />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartMeals />} />
          <Route path="/payment/:id" element={<GrandProduct />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/charity-campaign/:id" element={<CharityCampaignDetail />} />
          <Route path="/campaign-form" element={<CharityCampaignForm />} />
          <Route path="/article-form" element={<ArticleForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/payment-product/:id" element={<PaymentMethod />} />
          <Route path="/payment-charity/:id" element={<PaymentMethodCharity />} />
          <Route path="/charity-transaction/:id" element={<CharityTransaction />} />
          <Route path="/share-meals/form" element={<ShareMealsForm />} />
          <Route path="/profil/edit-profil" element={<EditProfil />} />
          <Route path="/share-meals/update/:id" element={<UpdateShareMeals />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} userRole={userData.role} />}>
          <Route path="/account-list" element={<AccountList />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/campaign-verif" element={<CampaignVerif />} />
          <Route path="/campaign-detail-verif/:id" element={<CampaignDetailVerif />} />
          <Route path="/article-verif" element={<BlogArticleVerif />} />
          <Route path="/article-detail-verif/:id" element={<ArticleVerifDetail />} />
          <Route path="/account-verif/:id" element={<AccountDetailVerif />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRoles={['mitra']} userRole={userData.role} />}>
          <Route path="/edit-profil-mitra" element={<EditProfilMitra />} />
          <Route path="/mitra" element={<DashboardMitra />} />
          <Route path="/sharemeals-mitra" element={<ShareMealsMitra />} />
          <Route path="/sharemeals-form-mitra" element={<ShareMealsFormMitra />} />
          <Route path="/profile-mitra" element={<ProfileMitra />} />
          <Route path="/update-product/:id" element={<UpdateProductMitra />} />
          </Route>
          <Route path="/verif-form-mitra" element={<AccountVerifForm />} />

          <Route element={<ProtectedRoute allowedRoles={['pengguna']} userRole={userData.role} />}>
          <Route path="/lembaga-sosial" element={<DashboardLS />} />
          <Route path="/charitycampaign-ls" element={<CharityCampaignLS />} />
          <Route path="/update-charity-ls/:id" element={<UpdateCharityLS />} />
          <Route path="/profile-ls" element={<ProfileLS />} />
          <Route path="/verif-form-ls" element={<AccountVerifFormLS />} />
          <Route path="/edit-profil-ls" element={<EditProfileLS />} />
          <Route path="/create-charity-ls" element={<CreateCharityLS />} />
          </Route>


        </Routes>
      </Router>

    </div>
  );
};

export default App;
