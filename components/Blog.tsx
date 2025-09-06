import React, { useState } from 'react';

// Added more posts to make pagination functional and demonstrate the feature.
const posts = [
  {
    category: 'Dicas',
    title: 'YouTube caiu? Veja por que está fora do ar e como resolver agora!',
    excerpt: 'O YouTube caiu? Veja como identificar o problema e descubra as melhores soluções para corrigir erros de reprodução.',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 30/09/2024 18:38:53',
    imageUrl: 'https://cdn.melhorplano.net/strapi/tecnologia_youtube_caiu_png_4a0c4d1c80.png',
  },
  {
    category: 'Dicas',
    title: 'Seu Whatsapp parou de funcionar? Saiba o que fazer!',
    excerpt: 'Saiba como e por que o Whatsapp parou de funcionar. Veja como solucionar o problema e aplicativos para usar enquanto o app não volta!',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 30/09/2024 18:38:51',
    imageUrl: 'https://cdn.melhorplano.net/strapi/tecnologia_whatsapp_parou_jpg_44a1802030.jpeg',
  },
  {
    category: 'Dicas',
    title: 'Uber Chip é bom? Saiba o que é e como funciona o serviço!',
    excerpt: 'Conheça o Chip da Uber e descubra se é bom, como fazer portabilidade e recargas, além de ver todos os planos e valores disponíveis!',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 30/09/2024 18:38:46',
    imageUrl: 'https://cdn.melhorplano.net/strapi/tecnologia_uber_chip_png_fa94d6bdef.png',
  },
    {
    category: 'Dicas',
    title: 'NordVPN: veja se vale a pena em 2025!',
    excerpt: 'NordVPN é boa? Descubra se vale a pena assinar em ${currentYear}, conheça seus recursos, preços e veja nossa análise completa com prós e contras!',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
      date: 'Última atualização: 30/09/2024 18:38:27',
    imageUrl: 'https://cdn.melhorplano.net/strapi/Copia_de_Modelo_Thumbs_para_MP_e_MC_17_0a65705652.jpg',
  },
  {
    category: 'Dicas',
    title: 'Como descobrir um número privado?',
    excerpt: 'Para fazer uma ligação privada, basta digitar #31# antes do número que deseja chamar. Esse código impede que seu número apareça para quem recebe.',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 30/09/2024 18:38:24',
    imageUrl: 'https://cdn.melhorplano.net/strapi/tecnologia_numero_privado_png_3dfbfbb622.png',
  },
    {
    category: 'Dicas',
    title: 'Evolução do celular: Linha do Tempo da História dos Celulares',
    excerpt: 'Desde a primeira geração em 1983, o celular passou por uma grande evolução até chegar nos modelos atuais.',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 30/09/2024 18:38:05',
    imageUrl: 'https://cdn.melhorplano.net/strapi/tecnologia_evolucao_do_celular_jpg_3f6c2ea3ca.jpeg',
  },
    {
    category: 'Dicas',
    title: 'Aprenda a espelhar o celular na TV com Android ou iOS | Métodos e Apps',
    excerpt: 'Saiba Como Espelhar o celular na TV Samsung, Smart TV, TV Chromecast e TV Comum | Siga o Tutorial e Aprenda a espelhar com Wifi ou Sem Internet!',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 30/09/2024 18:38:04',
    imageUrl: 'https://cdn.melhorplano.net/strapi/tecnologia_espelhar_celular_na_tv_png_0dbaeef706.png',
  },
    {
    category: 'Dicas',
    title: 'Como Usar Whatsapp Web',
    excerpt: 'Aprenda como usar WhatsApp Web. Veja o passo a passo de como entrar no aplicativo pelo computador, tablet e celular. Confira ainda dicas sobre o app!',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 30/09/2024 18:38:24',
    imageUrl: 'https://cdn.melhorplano.net/strapi/tecnologia_como_usar_whatsapp_web_jpg_fc069b134a.jpeg',
  },
      {
    category: 'Dicas',
    title: 'Aprenda a desativar ou exclurir sua conta Facebook',
    excerpt: 'Aprenda como desativar ou excluir seu Facebook pelo celular! Saiba como desativar temporariamente, como reativar sua conta e muito mais!',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 30/09/2024 18:37:42',
    imageUrl: 'https://cdn.melhorplano.net/strapi/tecnologia_como_desativar_o_facebook_png_767976ecae.png',
  },
      {
    category: 'Dicas',
    title: 'Apple Music: o que é e como usar essa plataforma de música',
    excerpt: 'Confira como usar Apple Music gratuitamente por um período limitado. Saiba também valores de cada plano e tudo o que o serviço oferece.',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 10/08/2023 00:00:00',
    imageUrl: 'https://cdn.melhorplano.net/cms/2022/07/26/62e04a452c253APPLE-MUSIC.png',
  },
      {
    category: 'Dicas',
    title: 'Ligação Spam: Por que você recebe e Como Bloquear?',
    excerpt: 'Entenda o que são e como bloquear chamadas indesejadas usando as configurações do celular, Não Me Perturbe, aplicativos e mais!',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 24/08/2023 00:00:00',
    imageUrl: 'https://cdn.melhorplano.net/cms/2022/07/18/62d5614854800LIGAO-SPAM.png',
  },
        {
    category: 'Dicas',
    title: 'iTunes: O que é? | Download no Windows | Login | Store e Charts',
    excerpt: 'Como restaurar iPhone pelo iTunes, download para Windows 7, 8 e 10, o que é, para que serve, onde fica no iPhone, tudo sobre o Store e o Charts e mais!',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 24/08/2023 00:00:00',
    imageUrl: 'https://cdn.melhorplano.net/cms/2022/04/25/6266f49e22b9bITUNES.jpg',
  },
        {
    category: 'Dicas',
    title: 'Tudo sobre celular com 5G: quais são os modelos compatíveis?',
    excerpt: 'Saiba quais aparelhos celulares são compatíveis com 5G e se você precisa trocar o seu. Veja também quais cidades e operadoras já têm cobertura 5G.',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 24/08/2023 00:00:00',
    imageUrl: 'https://cdn.melhorplano.net/cms/2022/11/14/6372500d96f9athumb_tecnologia_preciso_trocar_meu_celular_por_um_5g.jpeg',
  },
        {
    category: 'Dicas',
    title: 'Rede HFC | O que é | Como funciona | Diferenças entre GPON',
    excerpt: 'Descubra o que é Rede HFC, como funciona, quais as diferenças entre ADSL, HFC e GPON, o que causa Interferências e mais!',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 24/08/2023 00:00:00',
    imageUrl: 'https://cdn.melhorplano.net/cms/2021/10/19/616ed1aae3660rede_hfc.png',
  },
        {
    category: 'Dicas',
    title: 'Como desativar Instagram ou excluir sua conta passo a passo',
    excerpt: 'Saiba como Desativar o Instagram pelo celular e computador. Confira também o tutorial para Excluir a Conta do Instagram de forma definitiva!',
    author: {
      name: 'Recarga Digital',
      avatarUrl: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    },
    date: 'Última atualização: 24/08/2023 00:00:00',
    imageUrl: 'https://cdn.melhorplano.net/cms/2021/10/06/615df411cd5ceDesativar_instagram.png',
  },
  
];

const ArrowButton: React.FC<{ direction: 'left' | 'right'; onClick: () => void; isDisabled: boolean }> = ({ direction, onClick, isDisabled }) => (
    <button
        onClick={onClick}
        disabled={isDisabled}
        className={`flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${!isDisabled && 'hover:bg-gray-100'}`}
        aria-label={direction === 'left' ? 'Previous posts' : 'Next posts'}
    >
        {direction === 'left' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
        )}
    </button>
);


export const Blog: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const postsPerPage = 3;
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const indexOfLastPost = (currentPage + 1) * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
    };


    return (
        <section className="bg-gray-100 py-12 sm:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Nosso Blog</h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Fique por dentro das últimas notícias, dicas e tendências do mundo financeiro.
                    </p>
                </div>

                <div className="mt-12">
                    <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
                        {currentPosts.map((post) => (
                            <div key={post.title} className="flex flex-col overflow-hidden rounded-lg border border-gray-200">
                                <div className="flex-shrink-0">
                                    <img className="h-48 w-full object-cover" src={post.imageUrl} alt={post.title} />
                                </div>
                                <div className="flex flex-1 flex-col justify-between bg-white p-6">
                                    <div className="flex-1">
                                         <p className="text-sm font-medium text-black">
                                             <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                                                 {post.category}
                                             </span>
                                         </p>
                                        <a href="#" className="mt-2 block">
                                            <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                                            <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
                                        </a>
                                    </div>
                                    <div className="mt-6 flex items-center">
                                        <div className="flex-shrink-0">
                                            <a href="#">
                                                <span className="sr-only">{post.author.name}</span>
                                                <img className="h-10 w-10 rounded-full" src={post.author.avatarUrl} alt="" />
                                            </a>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">
                                                <a href="#" className="hover:underline">
                                                    {post.author.name}
                                                </a>
                                            </p>
                                            <div className="flex space-x-1 text-sm text-gray-500">
                                                <time dateTime={post.date}>{post.date}</time>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {totalPages > 1 && (
                    <div className="mt-10 flex justify-center items-center space-x-4">
                        <ArrowButton direction="left" onClick={prevPage} isDisabled={currentPage === 0} />
                         <span className="text-sm text-gray-600">
                            Página {currentPage + 1} de {totalPages}
                         </span>
                        <ArrowButton direction="right" onClick={nextPage} isDisabled={currentPage + 1 >= totalPages} />
                    </div>
                )}

            </div>
        </section>
    );
};
