import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Course {
  id: string;
  title: string;
  description: string;
  field: string;
  duration: string;
  format: string[];
  speakers: number;
  price: number;
  targetAudience: string;
  program: string[];
}

interface Speaker {
  id: string;
  name: string;
  organization: string;
  position: string;
  description: string;
  website?: string;
  avatar: string;
}

const courses: Course[] = [
  {
    id: "ai-medicine",
    title: "AI в медицине",
    description: "Применение искусственного интеллекта в диагностике, лечении и управлении медицинскими данными",
    field: "Медицина",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: 10,
    price: 25000,
    targetAudience: "Врачи, медицинские администраторы, IT-специалисты в здравоохранении",
    program: [
      "Введение в медицинский AI",
      "Диагностические системы",
      "Анализ медицинских изображений",
      "Персонализированная медицина",
      "Этические вопросы в медицинском AI"
    ]
  },
  {
    id: "ai-industry",
    title: "AI в промышленности и робототехнике",
    description: "Умные производственные системы, предиктивная аналитика и промышленная автоматизация",
    field: "Промышленность",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: 10,
    price: 25000,
    targetAudience: "Инженеры, технические директора, специалисты по автоматизации",
    program: [
      "Индустрия 4.0 и AI",
      "Предиктивное обслуживание",
      "Компьютерное зрение в производстве",
      "Роботизация процессов",
      "Цифровые двойники"
    ]
  },
  {
    id: "ai-retail",
    title: "AI в сервисе и ритейле",
    description: "Персонализация клиентского опыта, оптимизация логистики и автоматизация продаж",
    field: "Ритейл",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: 10,
    price: 25000,
    targetAudience: "Менеджеры по продажам, маркетологи, владельцы бизнеса",
    program: [
      "Рекомендательные системы",
      "Анализ поведения клиентов",
      "Чат-боты и виртуальные ассистенты",
      "Оптимизация цен",
      "Управление запасами"
    ]
  },
  {
    id: "ai-agriculture",
    title: "AI в сельском хозяйстве",
    description: "Точное земледелие, мониторинг урожая и оптимизация ресурсов",
    field: "Сельское хозяйство",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: 10,
    price: 25000,
    targetAudience: "Агрономы, фермеры, специалисты по сельскому хозяйству",
    program: [
      "Точное земледелие",
      "Дроны и сенсоры",
      "Прогнозирование урожайности",
      "Управление ресурсами",
      "Автоматизация процессов"
    ]
  },
  {
    id: "ai-logistics",
    title: "AI в логистике и транспорте",
    description: "Оптимизация маршрутов, управление цепочками поставок и автономные транспортные средства",
    field: "Логистика",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: 10,
    price: 25000,
    targetAudience: "Логисты, транспортные компании, менеджеры по закупкам",
    program: [
      "Оптимизация маршрутов",
      "Управление складами",
      "Прогнозирование спроса",
      "Автономные транспортные средства",
      "Блокчейн в логистике"
    ]
  },
  {
    id: "ai-management",
    title: "AI в работе руководителя бизнеса",
    description: "Стратегическое планирование, анализ данных и принятие решений с использованием AI",
    field: "Менеджмент",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: 10,
    price: 25000,
    targetAudience: "Руководители, управленцы среднего звена, бизнес-аналитики",
    program: [
      "AI-стратегия для бизнеса",
      "Анализ данных для принятия решений",
      "Автоматизация бизнес-процессов",
      "Управление командой в эпоху AI",
      "ROI от внедрения AI"
    ]
  },
  {
    id: "ai-engineering",
    title: "AI в работе инженера",
    description: "Интеграция AI в инженерные процессы, CAD-системы и техническое моделирование",
    field: "Инженерия",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: 10,
    price: 25000,
    targetAudience: "Инженеры всех специальностей, технические специалисты",
    program: [
      "AI в проектировании",
      "Генеративные модели",
      "Оптимизация конструкций",
      "Моделирование и симуляция",
      "Автоматизация расчетов"
    ]
  },
  {
    id: "ai-law",
    title: "AI в работе юриста",
    description: "Автоматизация правовой работы, анализ документов и юридическая аналитика",
    field: "Право",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: 10,
    price: 25000,
    targetAudience: "Юристы, правовые консультанты, нотариусы",
    program: [
      "Анализ правовых документов",
      "Автоматизация договорной работы",
      "Поиск правовой информации",
      "Предиктивная аналитика в праве",
      "Этические вопросы AI в праве"
    ]
  },
  {
    id: "ai-quality",
    title: "AI в стандартизации и контроле качества",
    description: "Автоматизация процессов контроля качества и стандартизации производства",
    field: "Качество",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: 10,
    price: 25000,
    targetAudience: "Специалисты по качеству, технические контролеры, аудиторы",
    program: [
      "Автоматизация контроля качества",
      "Анализ дефектов",
      "Стандартизация процессов",
      "Статистический анализ",
      "Интеграция с производством"
    ]
  },
  {
    id: "ai-foreign-trade",
    title: "AI во внешнеэкономической деятельности",
    description: "Автоматизация ВЭД, таможенное оформление и международная торговля",
    field: "ВЭД",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: 10,
    price: 25000,
    targetAudience: "Специалисты по ВЭД, таможенные брокеры, экспортеры",
    program: [
      "Автоматизация таможенного оформления",
      "Анализ торговых данных",
      "Валютное регулирование",
      "Международная логистика",
      "Комплаенс в ВЭД"
    ]
  }
];

const speakers: Speaker[] = [
  {
    id: "1",
    name: "Анна Петрова",
    organization: "Сбер",
    position: "Руководитель департамента AI",
    description: "Эксперт в области машинного обучения с 15-летним опытом работы в крупных технологических компаниях",
    website: "https://example.com",
    avatar: "/img/000f0893-4bf8-4b8c-ac5f-a1416127b16d.jpg"
  },
  {
    id: "2",
    name: "Михаил Соколов",
    organization: "Яндекс",
    position: "Главный Data Scientist",
    description: "Специалист по глубокому обучению и компьютерному зрению, автор 50+ научных публикаций",
    website: "https://example.com",
    avatar: "/img/000f0893-4bf8-4b8c-ac5f-a1416127b16d.jpg"
  },
  {
    id: "3",
    name: "Елена Кузнецова",
    organization: "МТС",
    position: "Директор по инновациям",
    description: "Лидер в области внедрения AI-решений в телекоммуникационной отрасли",
    website: "https://example.com",
    avatar: "/img/000f0893-4bf8-4b8c-ac5f-a1416127b16d.jpg"
  }
];

export default function Index() {
  const [cart, setCart] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<{ [key: string]: string }>({});

  const addToCart = (courseId: string) => {
    if (!cart.includes(courseId)) {
      setCart([...cart, courseId]);
    }
  };

  const removeFromCart = (courseId: string) => {
    setCart(cart.filter(id => id !== courseId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, courseId) => {
      const course = courses.find(c => c.id === courseId);
      return total + (course?.price || 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Icon name="Brain" className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-display font-bold text-gray-900">
                AI Technologies
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="relative">
                <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                Корзина
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {cart.length}
                  </Badge>
                )}
              </Button>
              <Button>Войти</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-600/20"
          style={{
            backgroundImage: `url(/img/42ee25be-0ef4-484d-9095-c2bb184c12b8.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Технологии искусственного интеллекта в бизнесе
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Образовательное мероприятие Фонда для профессионалов, готовых внедрить AI-решения в свою деятельность
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Icon name="Calendar" className="mr-2 h-5 w-5" />
              Выбрать курсы
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Icon name="Users" className="mr-2 h-5 w-5" />
              О спикерах
            </Button>
          </div>
        </div>
      </section>

      {/* About Event */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
              О мероприятии
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Уникальная программа из 10 специализированных курсов, разработанная ведущими экспертами в области искусственного интеллекта. 
              Каждый курс длится один день и включает практические кейсы, живые демонстрации и networking с коллегами.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Calendar" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">10 дней программы</h3>
                <p className="text-gray-600">Интенсивное обучение по специализированным направлениям AI</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100+ спикеров</h3>
                <p className="text-gray-600">Ведущие эксперты из крупнейших технологических компаний</p>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Award" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Сертификаты</h3>
                <p className="text-gray-600">Официальные сертификаты о прохождении обучения</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">
            Ведущие спикеры
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {speakers.map((speaker) => (
              <Card key={speaker.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={speaker.avatar} alt={speaker.name} />
                    <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold mb-2">{speaker.name}</h3>
                  <p className="text-primary font-medium mb-1">{speaker.position}</p>
                  <p className="text-gray-600 mb-3">{speaker.organization}</p>
                  <p className="text-sm text-gray-500 mb-4">{speaker.description}</p>
                  {speaker.website && (
                    <Button variant="outline" size="sm">
                      <Icon name="ExternalLink" className="h-4 w-4 mr-2" />
                      Подробнее
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Catalog */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">
            Каталог курсов
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{course.field}</Badge>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Целевая аудитория:</h4>
                      <p className="text-sm text-gray-600">{course.targetAudience}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Формат обучения:</h4>
                      <div className="flex gap-2">
                        {course.format.map((format) => (
                          <Badge key={format} variant="outline">{format}</Badge>
                        ))}
                      </div>
                    </div>

                    <Accordion type="single" collapsible>
                      <AccordionItem value="program">
                        <AccordionTrigger className="text-sm">
                          Программа курса
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-1 text-sm">
                            {course.program.map((item, index) => (
                              <li key={index} className="flex items-center">
                                <Icon name="CheckCircle" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-primary">
                          {course.price.toLocaleString()} ₽
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Icon name="Users" className="h-4 w-4 mr-1" />
                          {course.speakers} спикеров
                        </div>
                      </div>
                      
                      {cart.includes(course.id) ? (
                        <Button
                          variant="outline"
                          className="w-full text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => removeFromCart(course.id)}
                        >
                          <Icon name="Trash2" className="h-4 w-4 mr-2" />
                          Удалить из корзины
                        </Button>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => addToCart(course.id)}
                        >
                          <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                          Добавить в корзину
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">
            Расписание
          </h2>
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="schedule" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="schedule">Расписание курсов</TabsTrigger>
                <TabsTrigger value="formats">Форматы обучения</TabsTrigger>
              </TabsList>
              
              <TabsContent value="schedule" className="mt-6">
                <div className="space-y-4">
                  {courses.slice(0, 5).map((course, index) => (
                    <Card key={course.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{course.title}</h3>
                              <p className="text-gray-600">День {index + 1} • 9:00 - 18:00</p>
                            </div>
                          </div>
                          <Badge variant="outline">{course.field}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="formats" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Icon name="MapPin" className="h-5 w-5 mr-2 text-primary" />
                        Очное обучение
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Icon name="CheckCircle" className="h-4 w-4 text-green-500 mr-2" />
                          Личное общение со спикерами
                        </li>
                        <li className="flex items-center">
                          <Icon name="CheckCircle" className="h-4 w-4 text-green-500 mr-2" />
                          Networking с участниками
                        </li>
                        <li className="flex items-center">
                          <Icon name="CheckCircle" className="h-4 w-4 text-green-500 mr-2" />
                          Практические мастер-классы
                        </li>
                        <li className="flex items-center">
                          <Icon name="CheckCircle" className="h-4 w-4 text-green-500 mr-2" />
                          Кофе-брейки и обеды
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Icon name="Monitor" className="h-5 w-5 mr-2 text-primary" />
                        Онлайн-трансляция
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Icon name="CheckCircle" className="h-4 w-4 text-green-500 mr-2" />
                          Участие из любой точки мира
                        </li>
                        <li className="flex items-center">
                          <Icon name="CheckCircle" className="h-4 w-4 text-green-500 mr-2" />
                          Запись всех сессий
                        </li>
                        <li className="flex items-center">
                          <Icon name="CheckCircle" className="h-4 w-4 text-green-500 mr-2" />
                          Чат с вопросами спикерам
                        </li>
                        <li className="flex items-center">
                          <Icon name="CheckCircle" className="h-4 w-4 text-green-500 mr-2" />
                          Техническая поддержка
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* About Foundation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
              О Фонде и локации
            </h2>
            <p className="text-lg text-gray-600 mb-12">
              Фонд развития технологий искусственного интеллекта — ведущая организация в области AI-образования и исследований. 
              Мы объединяем экспертов, бизнес-лидеров и новаторов для создания будущего, основанного на интеллектуальных технологиях.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-6">Место проведения</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="MapPin" className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Технологический центр "Сколково"</p>
                      <p className="text-gray-600">Инновационный центр, Москва</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Car" className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Транспортная доступность</p>
                      <p className="text-gray-600">Метро "Сколково", бесплатная парковка</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Coffee" className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Сервисы</p>
                      <p className="text-gray-600">Питание, Wi-Fi, зоны отдыха</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-6">Наши партнеры</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Building" className="h-5 w-5 text-primary" />
                    <span>Сбербанк</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Building" className="h-5 w-5 text-primary" />
                    <span>Яндекс</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Building" className="h-5 w-5 text-primary" />
                    <span>МТС</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Building" className="h-5 w-5 text-primary" />
                    <span>Газпром Нефть</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">
            Часто задаваемые вопросы
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="faq1">
                <AccordionTrigger>
                  Можно ли выбрать только некоторые курсы?
                </AccordionTrigger>
                <AccordionContent>
                  Да, вы можете выбрать любое количество курсов в зависимости от ваших потребностей и интересов. 
                  Каждый курс является самостоятельным и не требует прохождения других курсов.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq2">
                <AccordionTrigger>
                  Предоставляются ли материалы после обучения?
                </AccordionTrigger>
                <AccordionContent>
                  Да, все участники получают доступ к презентациям спикеров, дополнительным материалам и записям сессий 
                  (для онлайн-участников) на срок до 6 месяцев после мероприятия.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq3">
                <AccordionTrigger>
                  Есть ли групповые скидки для компаний?
                </AccordionTrigger>
                <AccordionContent>
                  Да, мы предоставляем скидки для групп от 5 человек: 10% для групп 5-10 человек, 
                  15% для групп 11-20 человек, 20% для групп более 20 человек.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq4">
                <AccordionTrigger>
                  Какие сертификаты выдаются?
                </AccordionTrigger>
                <AccordionContent>
                  По окончании каждого курса участники получают именной сертификат Фонда о прохождении обучения 
                  с указанием количества академических часов и изученных тем.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq5">
                <AccordionTrigger>
                  Что включено в стоимость курса?
                </AccordionTrigger>
                <AccordionContent>
                  В стоимость входит: участие в курсе, материалы спикеров, сертификат, кофе-брейки и обед (для очного формата), 
                  техническая поддержка и доступ к записям (для онлайн-формата).
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
              Контакты
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Телефон</h3>
                <p className="text-gray-600">+7 (495) 123-45-67</p>
              </div>
              <div>
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-600">info@aifund.ru</p>
              </div>
              <div>
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Адрес</h3>
                <p className="text-gray-600">Сколково, Москва</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-6 min-w-[300px] border">
          <h3 className="font-semibold text-lg mb-4">Корзина курсов</h3>
          <div className="space-y-2 mb-4">
            {cart.map((courseId) => {
              const course = courses.find(c => c.id === courseId);
              return (
                <div key={courseId} className="flex items-center justify-between text-sm">
                  <span className="truncate mr-2">{course?.title}</span>
                  <span className="font-medium">{course?.price.toLocaleString()} ₽</span>
                </div>
              );
            })}
          </div>
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">Итого:</span>
              <span className="text-xl font-bold text-primary">{getTotalPrice().toLocaleString()} ₽</span>
            </div>
            <Button className="w-full" size="lg">
              <Icon name="CreditCard" className="h-4 w-4 mr-2" />
              Оформить заказ
            </Button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Brain" className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">AI Technologies</h3>
              </div>
              <p className="text-gray-400">
                Фонд развития технологий искусственного интеллекта
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Курсы</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI в медицине</li>
                <li>AI в промышленности</li>
                <li>AI в ритейле</li>
                <li>AI в логистике</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-gray-400">
                <li>О нас</li>
                <li>Партнеры</li>
                <li>Спикеры</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li>FAQ</li>
                <li>Техподдержка</li>
                <li>Условия использования</li>
                <li>Политика конфиденциальности</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Фонд развития технологий искусственного интеллекта. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}