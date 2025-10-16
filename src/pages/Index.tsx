import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [chatMessage, setChatMessage] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const [reactions, setReactions] = useState<Record<number, { fire: number; heart: number; clap: number }>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fullscreenVideo, setFullscreenVideo] = useState<typeof videos[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLive, setFilterLive] = useState<boolean | null>(null);
  const [subscriptions, setSubscriptions] = useState<string[]>(['DJ Max', 'Urban Vibes']);

  const handleReaction = (videoId: number, type: 'fire' | 'heart' | 'clap') => {
    setReactions(prev => ({
      ...prev,
      [videoId]: {
        fire: (prev[videoId]?.fire || 0) + (type === 'fire' ? 1 : 0),
        heart: (prev[videoId]?.heart || 0) + (type === 'heart' ? 1 : 0),
        clap: (prev[videoId]?.clap || 0) + (type === 'clap' ? 1 : 0)
      }
    }));
  };

  const videos = [
    {
      id: 1,
      title: 'Эпичная вписка в лофте',
      views: '15.2K',
      duration: '12:34',
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
      author: 'DJ Max',
      likes: 1234
    },
    {
      id: 2,
      title: 'LIVE: Ночная движуха прямо сейчас',
      views: '8.9K',
      duration: 'LIVE',
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3',
      author: 'Party King',
      likes: 892
    },
    {
      id: 3,
      title: 'Безумная атмосфера на крыше',
      views: '23.1K',
      duration: '18:45',
      isLive: false,
      thumbnail: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec',
      author: 'Urban Vibes',
      likes: 2341
    },
    {
      id: 4,
      title: 'LIVE: Стрим с вписки в центре',
      views: '12.4K',
      duration: 'LIVE',
      isLive: true,
      thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
      author: 'Night Owl',
      likes: 1567
    }
  ];

  const events = [
    { id: 1, title: 'Вписка в пятницу', date: '20 окт', location: 'Москва, Арбат' },
    { id: 2, title: 'Ночной рейв', date: '21 окт', location: 'СПб, Невский' },
    { id: 3, title: 'Крышная вечеринка', date: '25 окт', location: 'Москва, Центр' }
  ];

  const chatMessages = [
    { id: 1, user: 'Алекс', message: 'Огонь! 🔥', time: '2 мин' },
    { id: 2, user: 'Мария', message: 'Где это было?', time: '5 мин' },
    { id: 3, user: 'Дима', message: 'Хочу туда!!!', time: '7 мин' },
    { id: 4, user: 'Катя', message: 'Лучшая движуха', time: '10 мин' }
  ];

  const creators = [
    { id: 1, name: 'DJ Max', avatar: '', subscribers: '25K', videos: 142, isOnline: true },
    { id: 2, name: 'Party King', avatar: '', subscribers: '18K', videos: 98, isOnline: true },
    { id: 3, name: 'Urban Vibes', avatar: '', subscribers: '32K', videos: 215, isOnline: false },
    { id: 4, name: 'Night Owl', avatar: '', subscribers: '15K', videos: 76, isOnline: true },
    { id: 5, name: 'Bass Master', avatar: '', subscribers: '21K', videos: 134, isOnline: false }
  ];

  const toggleSubscription = (authorName: string) => {
    setSubscriptions(prev => 
      prev.includes(authorName) 
        ? prev.filter(name => name !== authorName)
        : [...prev, authorName]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#212121] via-[#2a1a3d] to-[#1a2535]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#212121]/80 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="gradient-primary rounded-xl p-2">
                <Icon name="Play" className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">ВПИСКА</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {['Главная', 'Видео', 'Трансляции', 'События', 'Сообщество'].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className={`text-sm font-semibold transition-all hover:text-[#FF1744] ${
                    activeTab === item.toLowerCase() ? 'text-[#FF1744]' : 'text-white/70'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white hover:text-[#FF1744] transition-colors"
              >
                <Icon name={mobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
              </button>
              <Button className="gradient-red-purple text-white font-bold hover:opacity-90 transition-opacity">
                <Icon name="Upload" className="w-4 h-4 mr-2" />
                Загрузить
              </Button>
              <Avatar className="w-10 h-10 border-2 border-[#FF1744]" />
            </div>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#212121] border-b border-white/10 animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {['Главная', 'Видео', 'Трансляции', 'События', 'Сообщество'].map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab(item.toLowerCase());
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === item.toLowerCase()
                      ? 'bg-gradient-to-r from-[#FF1744] to-[#9C27B0] text-white'
                      : 'text-white/70 hover:bg-white/5 hover:text-[#FF1744]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#FF1744] via-[#9C27B0] to-[#00E5FF]">
              Лучшие вписки здесь
            </h2>
            <p className="text-xl text-white/70 mb-6">Смотри, делись, зажигай вместе с нами</p>
            
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск видео, авторов, событий..."
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 h-12 text-base"
                  />
                </div>
                <Button className="gradient-purple-cyan text-white px-6 h-12 font-bold">
                  <Icon name="Search" className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <Button
                  onClick={() => setFilterLive(null)}
                  variant={filterLive === null ? "default" : "outline"}
                  className={filterLive === null ? "gradient-primary text-white" : "border-white/20 text-white/70 hover:text-white hover:bg-white/5"}
                >
                  Все
                </Button>
                <Button
                  onClick={() => setFilterLive(true)}
                  variant={filterLive === true ? "default" : "outline"}
                  className={filterLive === true ? "bg-[#FF1744] text-white hover:bg-[#FF1744]/90" : "border-white/20 text-white/70 hover:text-white hover:bg-white/5"}
                >
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  Прямые эфиры
                </Button>
                <Button
                  onClick={() => setFilterLive(false)}
                  variant={filterLive === false ? "default" : "outline"}
                  className={filterLive === false ? "gradient-red-purple text-white" : "border-white/20 text-white/70 hover:text-white hover:bg-white/5"}
                >
                  <Icon name="Video" className="w-4 h-4 mr-2" />
                  Записи
                </Button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <Badge className="bg-[#FF1744] text-white px-4 py-2 text-sm font-bold animate-pulse-glow">
                  <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                  LIVE СЕЙЧАС
                </Badge>
                <Badge variant="outline" className="border-[#9C27B0] text-[#9C27B0] px-4 py-2 text-sm font-bold">
                  🔥 В ТРЕНДЕ
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {videos
                  .filter(video => {
                    const matchesSearch = searchQuery === '' || 
                      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      video.author.toLowerCase().includes(searchQuery.toLowerCase());
                    const matchesFilter = filterLive === null || video.isLive === filterLive;
                    return matchesSearch && matchesFilter;
                  })
                  .map((video, index) => (
                  <Card
                    key={video.id}
                    className="group relative overflow-hidden bg-white/5 border-white/10 hover:border-[#FF1744]/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] animate-scale-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setFullscreenVideo(video)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {video.isLive && (
                        <Badge className="absolute top-3 left-3 bg-[#FF1744] text-white px-3 py-1 font-bold animate-pulse-glow">
                          <div className="w-2 h-2 bg-white rounded-full mr-2 inline-block animate-pulse" />
                          LIVE
                        </Badge>
                      )}
                      
                      <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-white text-xs font-bold">
                        {video.duration}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                          <Icon name="Play" className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10 border-2 border-[#9C27B0]" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-bold mb-1 line-clamp-2 group-hover:text-[#FF1744] transition-colors">
                            {video.title}
                          </h3>
                          <p className="text-white/60 text-sm">{video.author}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
                            <span className="flex items-center gap-1">
                              <Icon name="Eye" className="w-3 h-3" />
                              {video.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Heart" className="w-3 h-3" />
                              {video.likes}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleReaction(video.id, 'fire'); }}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all hover:scale-110 active:scale-95"
                            >
                              <span className="text-sm">🔥</span>
                              <span className="text-xs font-bold text-white">{reactions[video.id]?.fire || 0}</span>
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleReaction(video.id, 'heart'); }}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transition-all hover:scale-110 active:scale-95"
                            >
                              <span className="text-sm">❤️</span>
                              <span className="text-xs font-bold text-white">{reactions[video.id]?.heart || 0}</span>
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleReaction(video.id, 'clap'); }}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all hover:scale-110 active:scale-95"
                            >
                              <span className="text-sm">👏</span>
                              <span className="text-xs font-bold text-white">{reactions[video.id]?.clap || 0}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm animate-fade-in">
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="MessageCircle" className="w-5 h-5 text-[#00E5FF]" />
                    <h3 className="text-white font-bold">Живой чат</h3>
                  </div>
                  <p className="text-white/50 text-xs">Общайся в реальном времени</p>
                </div>

                <ScrollArea className="h-[300px] p-4">
                  <div className="space-y-3">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={msg.id}
                        className="flex gap-2 animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Avatar className="w-8 h-8 border border-[#9C27B0]" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white text-sm font-semibold">{msg.user}</span>
                            <span className="text-white/40 text-xs">{msg.time}</span>
                          </div>
                          <p className="text-white/80 text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Написать сообщение..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <Button className="gradient-purple-cyan text-white">
                      <Icon name="Send" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '200ms' }}>
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Icon name="Users" className="w-5 h-5 text-[#9C27B0]" />
                    <h3 className="text-white font-bold">Мои подписки</h3>
                  </div>
                </div>
                <ScrollArea className="max-h-[400px]">
                  <div className="p-4 space-y-3">
                    {creators.map((creator, index) => (
                      <div
                        key={creator.id}
                        className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#9C27B0]/50 transition-all cursor-pointer group animate-scale-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Avatar className="w-12 h-12 border-2 border-[#9C27B0]" />
                            {creator.isOnline && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-[#212121] rounded-full animate-pulse" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-semibold mb-0.5 group-hover:text-[#00E5FF] transition-colors">
                              {creator.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-white/60">
                              <span>{creator.subscribers} подписчиков</span>
                              <span>•</span>
                              <span>{creator.videos} видео</span>
                            </div>
                          </div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSubscription(creator.name);
                            }}
                            variant={subscriptions.includes(creator.name) ? "default" : "outline"}
                            className={subscriptions.includes(creator.name) 
                              ? "gradient-red-purple text-white text-xs px-3 h-8" 
                              : "border-white/20 text-white/70 hover:text-white hover:bg-white/5 text-xs px-3 h-8"
                            }
                          >
                            {subscriptions.includes(creator.name) ? (
                              <Icon name="Check" className="w-3 h-3" />
                            ) : (
                              <Icon name="Plus" className="w-3 h-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm animate-fade-in" style={{ animationDelay: '300ms' }}>
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" className="w-5 h-5 text-[#FF1744]" />
                    <h3 className="text-white font-bold">Ближайшие события</h3>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {events.map((event, index) => (
                    <div
                      key={event.id}
                      className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-[#9C27B0]/50 transition-all cursor-pointer group animate-scale-in"
                      style={{ animationDelay: `${(index + 2) * 100}ms` }}
                    >
                      <h4 className="text-white font-semibold mb-1 group-hover:text-[#00E5FF] transition-colors">
                        {event.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-white/60">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" className="w-3 h-3" />
                          {event.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="MapPin" className="w-3 h-3" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full gradient-red-purple text-white font-bold hover:opacity-90 transition-opacity">
                    Показать все события
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!fullscreenVideo} onOpenChange={() => setFullscreenVideo(null)}>
        <DialogContent className="max-w-6xl w-full h-[90vh] bg-[#212121] border-white/10 p-0">
          {fullscreenVideo && (
            <div className="flex flex-col lg:flex-row h-full">
              <div className="flex-1 flex flex-col bg-black">
                <div className="relative flex-1">
                  <img
                    src={fullscreenVideo.thumbnail}
                    alt={fullscreenVideo.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center hover:scale-110 transition-transform">
                      <Icon name="Play" className="w-10 h-10 text-white" />
                    </button>
                  </div>
                  {fullscreenVideo.isLive && (
                    <Badge className="absolute top-4 left-4 bg-[#FF1744] text-white px-4 py-2 font-bold animate-pulse-glow">
                      <div className="w-2 h-2 bg-white rounded-full mr-2 inline-block animate-pulse" />
                      LIVE
                    </Badge>
                  )}
                </div>
                
                <div className="p-4 bg-[#212121] border-t border-white/10">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-12 h-12 border-2 border-[#9C27B0]" />
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">{fullscreenVideo.title}</h3>
                      <p className="text-white/60 text-sm mb-3">{fullscreenVideo.author}</p>
                      <div className="flex items-center gap-4 text-sm text-white/50">
                        <span className="flex items-center gap-1">
                          <Icon name="Eye" className="w-4 h-4" />
                          {fullscreenVideo.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Heart" className="w-4 h-4" />
                          {fullscreenVideo.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => handleReaction(fullscreenVideo.id, 'fire')}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>🔥</span>
                      <span className="text-sm font-bold text-white">{reactions[fullscreenVideo.id]?.fire || 0}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(fullscreenVideo.id, 'heart')}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>❤️</span>
                      <span className="text-sm font-bold text-white">{reactions[fullscreenVideo.id]?.heart || 0}</span>
                    </button>
                    <button
                      onClick={() => handleReaction(fullscreenVideo.id, 'clap')}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all hover:scale-105 active:scale-95"
                    >
                      <span>👏</span>
                      <span className="text-sm font-bold text-white">{reactions[fullscreenVideo.id]?.clap || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-96 flex flex-col bg-white/5">
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Icon name="MessageCircle" className="w-5 h-5 text-[#00E5FF]" />
                    <h3 className="text-white font-bold">Чат стрима</h3>
                  </div>
                </div>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-3">
                    {chatMessages.map((msg, index) => (
                      <div key={msg.id} className="flex gap-2 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                        <Avatar className="w-8 h-8 border border-[#9C27B0]" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-white text-sm font-semibold">{msg.user}</span>
                            <span className="text-white/40 text-xs">{msg.time}</span>
                          </div>
                          <p className="text-white/80 text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Написать в чат..."
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                    <Button className="gradient-purple-cyan text-white">
                      <Icon name="Send" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;