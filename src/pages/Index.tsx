import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Speaker {
  id: string;
  name: string;
  organization: string;
  position: string;
  description: string;
  website?: string;
  avatar: string;
  expertise: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  field: string;
  duration: string;
  format: string[];
  speakers: Speaker[];
  price: number;
  targetAudience: string;
  program: {
    title: string;
    topics: string[];
    duration: string;
  }[];
  learningOutcomes: string[];
  requirements: string[];
  schedule: string;
}

// Генерация 100 спикеров (по 10 для каждого курса)
const generateSpeakers = (): Speaker[] => {
  const names = [
    'Александр Иванов', 'Мария Петрова', 'Дмитрий Сидоров', 'Елена Козлова', 'Андрей Морозов',
    'Ольга Новикова', 'Сергей Волков', 'Анна Соколова', 'Максим Лебедев', 'Татьяна Попова',
    'Михаил Орлов', 'Наталья Васильева', 'Игорь Федоров', 'Светлана Михайлова', 'Владимир Алексеев',
    'Екатерина Романова', 'Павел Григорьев', 'Юлия Степанова', 'Николай Семенов', 'Ирина Павлова'
  ];

  const organizations = [
    'Сбербанк', 'Яндекс', 'МТС', 'Газпром Нефть', 'Роснефть', 'ВТБ', 'Тинькофф', 'OZON',
    'Wildberries', 'Мегафон', 'Билайн', 'Ростелеком', 'Норникель', 'Лукойл', 'Магнит',
    'X5 Retail Group', 'Сургутнефтегаз', 'Новатэк', 'Татнефть', 'Башнефть'
  ];

  const positions = [
    'Директор по технологиям', 'Главный архитектор', 'Руководитель департамента AI',
    'Ведущий Data Scientist', 'Главный аналитик', 'Директор по инновациям',
    'Руководитель центра машинного обучения', 'Главный специалист по AI',
    'Директор по цифровым технологиям', 'Ведущий исследователь'
  ];

  const speakers: Speaker[] = [];
  let speakerId = 1;

  for (let i = 0; i < 100; i++) {
    speakers.push({
      id: speakerId.toString(),
      name: names[i % names.length],
      organization: organizations[i % organizations.length],
      position: positions[i % positions.length],
      description: `Эксперт в области искусственного интеллекта с ${5 + (i % 15)}-летним опытом работы в крупных технологических компаниях. Специализируется на внедрении AI-решений в бизнес-процессы.`,
      website: 'https://example.com',
      avatar: '/img/000f0893-4bf8-4b8c-ac5f-a1416127b16d.jpg',
      expertise: ['Machine Learning', 'Deep Learning', 'Data Science', 'AI Strategy']
    });
    speakerId++;
  }

  return speakers;
};

const allSpeakers = generateSpeakers();

const courses: Course[] = [
  {
    id: "ai-medicine",
    title: "AI в медицине",
    description: "Применение искусственного интеллекта в диагностике, лечении и управлении медицинскими данными",
    field: "Медицина",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: allSpeakers.slice(0, 10),
    price: 25000,
    targetAudience: "Врачи, медицинские администраторы, IT-специалисты в здравоохранении",
    program: [
      {
        title: "Введение в медицинский AI",
        topics: ["История AI в медицине", "Основные направления применения", "Регулирование и стандарты"],
        duration: "2 часа"
      },
      {
        title: "Диагностические системы",
        topics: ["Анализ медицинских изображений", "Интерпретация лабораторных данных", "Системы поддержки принятия решений"],
        duration: "2 часа"
      },
      {
        title: "Персонализированная медицина",
        topics: ["Генетический анализ", "Предиктивная аналитика", "Индивидуальные планы лечения"],
        duration: "2 часа"
      },
      {
        title: "Этические вопросы",
        topics: ["Конфиденциальность данных", "Алгоритмическая справедливость", "Ответственность AI-систем"],
        duration: "2 часа"
      }
    ],
    learningOutcomes: [
      "Понимание основных принципов применения AI в медицине",
      "Навыки работы с медицинскими AI-системами",
      "Знание этических аспектов использования AI в здравоохранении"
    ],
    requirements: ["Базовые знания в области медицины", "Понимание основ информационных технологий"],
    schedule: "9:00-18:00 с перерывами на кофе и обед"
  },
  {
    id: "ai-industry",
    title: "AI в промышленности и робототехнике",
    description: "Умные производственные системы, предиктивная аналитика и промышленная автоматизация",
    field: "Промышленность",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: allSpeakers.slice(10, 20),
    price: 25000,
    targetAudience: "Инженеры, технические директора, специалисты по автоматизации",
    program: [
      {
        title: "Индустрия 4.0 и AI",
        topics: ["Концепция Индустрии 4.0", "Роль AI в умном производстве", "Интеграция систем"],
        duration: "2 часа"
      },
      {
        title: "Предиктивное обслуживание",
        topics: ["Анализ состояния оборудования", "Прогнозирование отказов", "Оптимизация ремонтных работ"],
        duration: "2 часа"
      },
      {
        title: "Компьютерное зрение в производстве",
        topics: ["Контроль качества", "Мониторинг процессов", "Безопасность на производстве"],
        duration: "2 часа"
      },
      {
        title: "Цифровые двойники",
        topics: ["Моделирование производственных процессов", "Виртуальное тестирование", "Оптимизация"],
        duration: "2 часа"
      }
    ],
    learningOutcomes: [
      "Понимание принципов Индустрии 4.0",
      "Навыки внедрения AI-решений в производство",
      "Знание технологий предиктивного обслуживания"
    ],
    requirements: ["Техническое образование", "Опыт работы в промышленности"],
    schedule: "9:00-18:00 с перерывами на кофе и обед"
  },
  {
    id: "ai-retail",
    title: "AI в сервисе и ритейле",
    description: "Персонализация клиентского опыта, оптимизация логистики и автоматизация продаж",
    field: "Ритейл",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: allSpeakers.slice(20, 30),
    price: 25000,
    targetAudience: "Менеджеры по продажам, маркетологи, владельцы бизнеса",
    program: [
      {
        title: "Рекомендательные системы",
        topics: ["Алгоритмы персонализации", "Анализ поведения покупателей", "Увеличение конверсии"],
        duration: "2 часа"
      },
      {
        title: "Чат-боты и виртуальные ассистенты",
        topics: ["Автоматизация обслуживания", "Обработка естественного языка", "Интеграция с CRM"],
        duration: "2 часа"
      },
      {
        title: "Оптимизация цен",
        topics: ["Динамическое ценообразование", "Анализ конкурентов", "Максимизация прибыли"],
        duration: "2 часа"
      },
      {
        title: "Управление запасами",
        topics: ["Прогнозирование спроса", "Оптимизация закупок", "Минимизация остатков"],
        duration: "2 часа"
      }
    ],
    learningOutcomes: [
      "Навыки внедрения AI в ритейл",
      "Понимание принципов персонализации",
      "Знание методов оптимизации продаж"
    ],
    requirements: ["Опыт работы в ритейле или маркетинге", "Базовые знания аналитики"],
    schedule: "9:00-18:00 с перерывами на кофе и обед"
  },
  {
    id: "ai-agriculture",
    title: "AI в сельском хозяйстве",
    description: "Точное земледелие, мониторинг урожая и оптимизация ресурсов",
    field: "Сельское хозяйство",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: allSpeakers.slice(30, 40),
    price: 25000,
    targetAudience: "Агрономы, фермеры, специалисты по сельскому хозяйству",
    program: [
      {
        title: "Точное земледелие",
        topics: ["Анализ почвы", "Оптимизация внесения удобрений", "Зонирование полей"],
        duration: "2 часа"
      },
      {
        title: "Дроны и сенсоры",
        topics: ["Мониторинг посевов", "Обнаружение болезней", "Автономные системы"],
        duration: "2 часа"
      },
      {
        title: "Прогнозирование урожайности",
        topics: ["Анализ погодных данных", "Модели роста растений", "Планирование сбора урожая"],
        duration: "2 часа"
      },
      {
        title: "Управление ресурсами",
        topics: ["Оптимизация полива", "Энергоэффективность", "Устойчивое развитие"],
        duration: "2 часа"
      }
    ],
    learningOutcomes: [
      "Понимание принципов точного земледелия",
      "Навыки работы с агротехническими AI-системами",
      "Знание методов оптимизации сельскохозяйственного производства"
    ],
    requirements: ["Образование в области сельского хозяйства", "Базовые знания агротехники"],
    schedule: "9:00-18:00 с перерывами на кофе и обед"
  },
  {
    id: "ai-logistics",
    title: "AI в логистике и транспорте",
    description: "Оптимизация маршрутов, управление цепочками поставок и автономные транспортные средства",
    field: "Логистика",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: allSpeakers.slice(40, 50),
    price: 25000,
    targetAudience: "Логисты, транспортные компании, менеджеры по закупкам",
    program: [
      {
        title: "Оптимизация маршрутов",
        topics: ["Алгоритмы маршрутизации", "Учет трафика", "Минимизация затрат"],
        duration: "2 часа"
      },
      {
        title: "Управление складами",
        topics: ["Автоматизация складских операций", "Робототехника", "Инвентаризация"],
        duration: "2 часа"
      },
      {
        title: "Прогнозирование спроса",
        topics: ["Анализ трендов", "Сезонность", "Планирование поставок"],
        duration: "2 часа"
      },
      {
        title: "Автономные транспортные средства",
        topics: ["Беспилотные технологии", "Безопасность", "Регулирование"],
        duration: "2 часа"
      }
    ],
    learningOutcomes: [
      "Навыки оптимизации логистических процессов",
      "Понимание принципов управления цепочками поставок",
      "Знание перспектив автономного транспорта"
    ],
    requirements: ["Опыт работы в логистике", "Базовые знания транспортных процессов"],
    schedule: "9:00-18:00 с перерывами на кофе и обед"
  },
  {
    id: "ai-management",
    title: "AI в работе руководителя бизнеса",
    description: "Стратегическое планирование, анализ данных и принятие решений с использованием AI",
    field: "Менеджмент",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: allSpeakers.slice(50, 60),
    price: 25000,
    targetAudience: "Руководители, управленцы среднего звена, бизнес-аналитики",
    program: [
      {
        title: "AI-стратегия для бизнеса",
        topics: ["Цифровая трансформация", "Конкурентные преимущества", "Инвестиции в AI"],
        duration: "2 часа"
      },
      {
        title: "Анализ данных для принятия решений",
        topics: ["Business Intelligence", "Предиктивная аналитика", "KPI и метрики"],
        duration: "2 часа"
      },
      {
        title: "Автоматизация бизнес-процессов",
        topics: ["RPA технологии", "Оптимизация workflows", "Управление изменениями"],
        duration: "2 часа"
      },
      {
        title: "ROI от внедрения AI",
        topics: ["Оценка эффективности", "Методики расчета", "Управление проектами"],
        duration: "2 часа"
      }
    ],
    learningOutcomes: [
      "Понимание стратегических аспектов AI",
      "Навыки оценки AI-проектов",
      "Знание методов внедрения AI в организации"
    ],
    requirements: ["Управленческий опыт", "Базовые знания бизнес-анализа"],
    schedule: "9:00-18:00 с перерывами на кофе и обед"
  },
  {
    id: "ai-engineering",
    title: "AI в работе инженера",
    description: "Интеграция AI в инженерные процессы, CAD-системы и техническое моделирование",
    field: "Инженерия",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: allSpeakers.slice(60, 70),
    price: 25000,
    targetAudience: "Инженеры всех специальностей, технические специалисты",
    program: [
      {
        title: "AI в проектировании",
        topics: ["Генеративный дизайн", "Оптимизация конструкций", "CAD-интеграция"],
        duration: "2 часа"
      },
      {
        title: "Моделирование и симуляция",
        topics: ["Численное моделирование", "Прогнозирование свойств", "Виртуальные испытания"],
        duration: "2 часа"
      },
      {
        title: "Автоматизация расчетов",
        topics: ["Инженерные расчеты", "Алгоритмы оптимизации", "Валидация результатов"],
        duration: "2 часа"
      },
      {
        title: "Контроль качества",
        topics: ["Автоматический контроль", "Дефектоскопия", "Статистический анализ"],
        duration: "2 часа"
      }
    ],
    learningOutcomes: [
      "Навыки применения AI в инженерии",
      "Понимание принципов генеративного дизайна",
      "Знание методов автоматизации инженерных расчетов"
    ],
    requirements: ["Техническое образование", "Опыт инженерной работы"],
    schedule: "9:00-18:00 с перерывами на кофе и обед"
  },
  {
    id: "ai-law",
    title: "AI в работе юриста",
    description: "Автоматизация правовой работы, анализ документов и юридическая аналитика",
    field: "Право",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: allSpeakers.slice(70, 80),
    price: 25000,
    targetAudience: "Юристы, правовые консультанты, нотариусы",
    program: [
      {
        title: "Анализ правовых документов",
        topics: ["Автоматическое извлечение данных", "Классификация документов", "Поиск прецедентов"],
        duration: "2 часа"
      },
      {
        title: "Автоматизация договорной работы",
        topics: ["Генерация документов", "Проверка соответствия", "Управление версиями"],
        duration: "2 часа"
      },
      {
        title: "Предиктивная аналитика в праве",
        topics: ["Прогнозирование исходов дел", "Анализ судебной практики", "Оценка рисков"],
        duration: "2 часа"
      },
      {
        title: "Этические вопросы AI в праве",
        topics: ["Алгоритмическая справедливость", "Прозрачность решений", "Ответственность"],
        duration: "2 часа"
      }
    ],
    learningOutcomes: [
      "Навыки автоматизации правовой работы",
      "Понимание возможностей AI в юриспруденции",
      "Знание этических аспектов применения AI в праве"
    ],
    requirements: ["Юридическое образование", "Опыт правовой работы"],
    schedule: "9:00-18:00 с перерывами на кофе и обед"
  },
  {
    id: "ai-quality",
    title: "AI в стандартизации и контроле качества",
    description: "Автоматизация процессов контроля качества и стандартизации производства",
    field: "Качество",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: allSpeakers.slice(80, 90),
    price: 25000,
    targetAudience: "Специалисты по качеству, технические контролеры, аудиторы",
    program: [
      {
        title: "Автоматизация контроля качества",
        topics: ["Системы машинного зрения", "Автоматические измерения", "Классификация дефектов"],
        duration: "2 часа"
      },
      {
        title: "Статистический анализ",
        topics: ["Контрольные карты", "Анализ трендов", "Прогнозирование качества"],
        duration: "2 часа"
      },
      {
        title: "Стандартизация процессов",
        topics: ["Автоматическая проверка соответствия", "Управление документооборотом", "Аудит качества"],
        duration: "2 часа"
      },
      {
        title: "Интеграция с производством",
        topics: ["Обратная связь в реальном времени", "Корректирующие действия", "Непрерывное улучшение"],
        duration: "2 часа"
      }
    ],
    learningOutcomes: [
      "Навыки автоматизации контроля качества",
      "Понимание принципов статистического анализа",
      "Знание методов интеграции AI в системы качества"
    ],
    requirements: ["Образование в области качества", "Опыт работы в контроле качества"],
    schedule: "9:00-18:00 с перерывами на кофе и обед"
  },
  {
    id: "ai-foreign-trade",
    title: "AI во внешнеэкономической деятельности",
    description: "Автоматизация ВЭД, таможенное оформление и международная торговля",
    field: "ВЭД",
    duration: "1 день",
    format: ["Очно", "Онлайн"],
    speakers: allSpeakers.slice(90, 100),
    price: 25000,
    targetAudience: "Специалисты по ВЭД, таможенные брокеры, экспортеры",
    program: [
      {
        title: "Автоматизация таможенного оформления",
        topics: ["Электронное декларирование", "Автоматическая классификация товаров", "Проверка документов"],
        duration: "2 часа"
      },
      {
        title: "Анализ торговых данных",
        topics: ["Анализ рынков", "Прогнозирование цен", "Оптимизация поставок"],
        duration: "2 часа"
      },
      {
        title: "Валютное регулирование",
        topics: ["Автоматический контроль операций", "Соответствие требованиям", "Отчетность"],
        duration: "2 часа"
      },
      {
        title: "Комплаенс в ВЭД",
        topics: ["Проверка санкционных списков", "Контроль контрагентов", "Управление рисками"],
        duration: "2 часа"
      }
    ],
    learningOutcomes: [
      "Навыки автоматизации ВЭД-процессов",
      "Понимание принципов цифрового таможенного оформления",
      "Знание методов анализа международной торговли"
    ],
    requirements: ["Опыт работы в ВЭД", "Знание таможенного законодательства"],
    schedule: "9:00-18:00 с перерывами на кофе и обед"
  }
];

export default function Index() {
  const [cart, setCart] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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
            backgroundImage: `url(/img/4bf4fc87-8b77-4591-a054-eadd6bfab266.jpg)`,
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
                <h3 className="text-xl font-semibold mb-2">100 спикеров</h3>
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

      {/* Courses Catalog */}
      <section className="py-16 bg-gray-50">
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

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-primary">
                          {course.price.toLocaleString()} ₽
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Icon name="Users" className="h-4 w-4 mr-1" />
                          {course.speakers.length} спикеров
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1">
                              <Icon name="Info" className="h-4 w-4 mr-2" />
                              Подробнее
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">{course.title}</DialogTitle>
                              <DialogDescription>{course.description}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-semibold mb-3">Программа курса:</h4>
                                <div className="space-y-4">
                                  {course.program.map((session, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <h5 className="font-medium">{session.title}</h5>
                                        <span className="text-sm text-gray-500">{session.duration}</span>
                                      </div>
                                      <ul className="text-sm text-gray-600 space-y-1">
                                        {session.topics.map((topic, topicIndex) => (
                                          <li key={topicIndex} className="flex items-center">
                                            <Icon name="CheckCircle" className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                            {topic}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-3">Спикеры курса:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {course.speakers.map((speaker) => (
                                    <div key={speaker.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                                      <Avatar className="w-12 h-12">
                                        <AvatarImage src={speaker.avatar} alt={speaker.name} />
                                        <AvatarFallback>{speaker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <div className="flex-1">
                                        <h5 className="font-medium">{speaker.name}</h5>
                                        <p className="text-sm text-gray-600">{speaker.position}</p>
                                        <p className="text-sm text-gray-500">{speaker.organization}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-3">Что вы изучите:</h4>
                                  <ul className="space-y-2">
                                    {course.learningOutcomes.map((outcome, index) => (
                                      <li key={index} className="flex items-start">
                                        <Icon name="CheckCircle" className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{outcome}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-3">Требования:</h4>
                                  <ul className="space-y-2">
                                    {course.requirements.map((requirement, index) => (
                                      <li key={index} className="flex items-start">
                                        <Icon name="AlertCircle" className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{requirement}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="border-t pt-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="font-semibold">Расписание:</h4>
                                    <p className="text-sm text-gray-600">{course.schedule}</p>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-3xl font-bold text-primary">{course.price.toLocaleString()} ₽</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        {cart.includes(course.id) ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                            onClick={() => removeFromCart(course.id)}
                          >
                            <Icon name="Trash2" className="h-4 w-4 mr-2" />
                            Удалить
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => addToCart(course.id)}
                          >
                            <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                            В корзину
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-6 min-w-[300px] border z-50">
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