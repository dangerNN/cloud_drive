import { useState, useEffect } from 'react';
import './App.css';

import { translations } from './data/translations';
import AuthScreen from './components/AuthScreen';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import FilesTab from './components/Tabs/FilesTab';
import PhotosTab from './components/Tabs/PhotosTab';
import SavedTab from './components/Tabs/SavedTab';
import NotesTab from './components/Tabs/NotesTab';
import VaultTab from './components/Tabs/VaultTab';
import SettingsTab from './components/Tabs/SettingsTab';

import UploadModal from './components/Modals/UploadModal';
import TokenModal from './components/Modals/TokenModal';

import { saveToDB, getFromDB } from './utils/db';

function MainDashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('nexus_tab') || 'files');
  const [searchQuery, setSearchQuery] = useState('');
  const [lang, setLang] = useState(() => localStorage.getItem('nexus_lang') || 'ru');
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('nexus_accent') || '#00f2fe');

  const [uploadModalConfig, setUploadModalConfig] = useState(null);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);

  const t = translations[lang] || translations['ru'];

  // Состояния для файлов и фото
  const [files, setFiles] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [isDBLoaded, setIsDBLoaded] = useState(false);

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('nexus_messages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedFiles = await getFromDB('nexus_files') || [];
        const savedPhotos = await getFromDB('nexus_photos') || [];
        
        // Восстанавливаем временные URL для отображения картинок
        const photosWithPreviews = savedPhotos.map(p => ({
          ...p,
          previewUrl: p.fileBlob ? URL.createObjectURL(p.fileBlob) : p.previewUrl
        }));

        setFiles(savedFiles);
        setPhotos(photosWithPreviews);
        setIsDBLoaded(true);
      } catch (error) {
        console.error("Ошибка загрузки из БД:", error);
        setIsDBLoaded(true);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (isDBLoaded) saveToDB('nexus_files', files);
  }, [files, isDBLoaded]);

  useEffect(() => {
    if (isDBLoaded) saveToDB('nexus_photos', photos);
  }, [photos, isDBLoaded]);

  useEffect(() => localStorage.setItem('nexus_messages', JSON.stringify(messages)), [messages]);
  useEffect(() => localStorage.setItem('nexus_lang', lang), [lang]);
  useEffect(() => localStorage.setItem('nexus_accent', accentColor), [accentColor]);
  useEffect(() => localStorage.setItem('nexus_tab', activeTab), [activeTab]);

  const totalUsedBytes = files.reduce((acc, f) => acc + (f.rawSize || 0), 0) + 
                         photos.reduce((acc, p) => acc + (p.rawSize || 0), 0);

  const toggleSaveFile = (id) => setFiles(files.map(f => f.id === id ? { ...f, isSaved: !f.isSaved } : f));
  const toggleSavePhoto = (id) => setPhotos(photos.map(p => p.id === id ? { ...p, isSaved: !p.isSaved } : p));

  const handleFileUpload = (fileObj) => {
    const newFile = {
      id: Date.now(),
      name: fileObj.name,
      rawSize: fileObj.size,
      fileBlob: fileObj,
      date: 'Только что',
      daysLeft: 7,
      isSaved: false
    };
    setFiles(prev => [newFile, ...prev]);
  };

  const handlePhotoUpload = (fileObj) => {
    const newPhoto = {
      id: Date.now(),
      title: fileObj.name,
      rawSize: fileObj.size,
      fileBlob: fileObj,
      previewUrl: URL.createObjectURL(fileObj), // Создаем URL для моментального отображения
      daysLeft: 7,
      isSaved: false
    };
    setPhotos(prev => [newPhoto, ...prev]);
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredPhotos = photos.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const savedFiles = files.filter(f => f.isSaved);
  const savedPhotos = photos.filter(p => p.isSaved);

  if (!isDBLoaded) return <div className="d-flex min-vh-100 align-items-center justify-content-center text-white">Загрузка хранилища...</div>;

  return (
    <div className="app-container" style={{ '--accent-cyan': accentColor }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} t={t} savedCount={savedFiles.length + savedPhotos.length} onOpenTokenModal={() => setShowTokenModal(true)} accentColor={accentColor} totalUsedBytes={totalUsedBytes} />
      <div className="main-content p-3 d-flex flex-column">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} t={t} user={user} onLogout={onLogout} />
        {activeTab === 'files' && <FilesTab files={filteredFiles} setFiles={setFiles} toggleSaveFile={toggleSaveFile} onOpenUploadModal={() => setUploadModalConfig({ type: 'file' })} t={t} />}
        {activeTab === 'photos' && <PhotosTab photos={filteredPhotos} setPhotos={setPhotos} toggleSavePhoto={toggleSavePhoto} onOpenPhotoUploadModal={() => setUploadModalConfig({ type: 'photo' })} t={t} />}
        {activeTab === 'saved' && <SavedTab savedFiles={savedFiles} savedPhotos={savedPhotos} toggleSaveFile={toggleSaveFile} toggleSavePhoto={toggleSavePhoto} setFiles={setFiles} setPhotos={setPhotos} t={t} />}
        {activeTab === 'messages' && <NotesTab messages={messages} setMessages={setMessages} t={t} />}
        {activeTab === 'vault' && <VaultTab isVaultUnlocked={isVaultUnlocked} setIsVaultUnlocked={setIsVaultUnlocked} t={t} />}
        {activeTab === 'settings' && <SettingsTab lang={lang} setLang={setLang} accentColor={accentColor} setAccentColor={setAccentColor} t={t} />}
      </div>
      {uploadModalConfig && <UploadModal accept={uploadModalConfig.type === 'photo' ? 'image/*' : '*'} title={uploadModalConfig.type === 'photo' ? 'Загрузка фотографии' : 'Загрузка файла'} onClose={() => setUploadModalConfig(null)} onUpload={uploadModalConfig.type === 'photo' ? handlePhotoUpload : handleFileUpload} />}
      {showTokenModal && <TokenModal onClose={() => setShowTokenModal(false)} />}
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('nexus_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (email) => {
    setUser({ email });
    localStorage.setItem('nexus_user', JSON.stringify({ email }));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nexus_user');
  };

  return user ? <MainDashboard user={user} onLogout={handleLogout} /> : <AuthScreen onLogin={handleLogin} />;
}