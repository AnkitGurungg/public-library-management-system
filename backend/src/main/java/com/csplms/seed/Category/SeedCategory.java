package com.csplms.seed.Category;

import com.csplms.entity.Book;
import com.csplms.entity.Category;
import com.csplms.entity.Shelf;
import com.csplms.repository.BookRepository;
import com.csplms.repository.CategoryRepository;
import com.csplms.repository.ShelfRepository;
import com.csplms.util.GlobalDateUtil;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;

@Component
public class SeedCategory implements ApplicationRunner {

    private final CategoryRepository categoryRepository;
    private final SeedCategoryHelper seedCategoryHelper;
    private final GlobalDateUtil globalDateUtil;
    private final ShelfRepository shelfRepository;
    private final BookRepository bookRepository;

    @Autowired
    public SeedCategory(CategoryRepository categoryRepository, SeedCategoryHelper seedCategoryHelper, GlobalDateUtil globalDateUtil, ShelfRepository shelfRepository, BookRepository bookRepository) {
        this.categoryRepository = categoryRepository;
        this.seedCategoryHelper = seedCategoryHelper;
        this.globalDateUtil = globalDateUtil;
        this.shelfRepository = shelfRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
//        categoryOne();
//        categoryTwo();
//        categoryThree();
//        categoryFour();
//        categoryFive();
//        categorySix();
//        categorySeven();
//        categoryEight();
//        categoryNine();
//        categoryTen();
    }

    public Category categoryOne(){
        Category category = new Category();
        category.setName("Generalities");
        category.setStartingNumber("001");
        category.setEndingNumber("099");
        category.setDescription("Generality books");
        category.setAddedDate(globalDateUtil.getCurrentDate());
        
        category.setPresent(true);
        category = categoryRepository.save(category);
        categoryRepository.flush();

        Shelf shelf = new Shelf();
        shelf.setName("Oakwood");
        shelf.setTotalCapacity(30);
        shelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        shelf.setDescription("Classic and strong");
        shelf.setCategory(category);
        shelf.setPresent(true);
        shelf = shelfRepository.save(shelf);
        shelfRepository.flush();

        return category;
    }

    public Category categoryTwo(){
        Category category = new Category();
        category.setName("Philosophy");
        category.setStartingNumber("100");
        category.setEndingNumber("199");
        category.setDescription("Philosophy books");
        category.setAddedDate(globalDateUtil.getCurrentDate());
        
        category.setPresent(true);
        category = categoryRepository.save(category);
        categoryRepository.flush();

        Shelf shelf = new Shelf();
        shelf.setName("Elm Shelf");
        shelf.setTotalCapacity(32);
        shelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        shelf.setDescription("Natural and calm");
        shelf.setCategory(category);
        shelf.setPresent(true);
        shelf = shelfRepository.save(shelf);
        shelfRepository.flush();


        Book book = new Book();
        book.setIsbn("9781847679406");
        book.setTitle("Incagnita");
        book.setAuthor("David Eagleman");
        book.setLanguage("English");
        book.setEdition("1st");
        book.setPageCount(290);
        book.setTotalQuantity(18);
        book.setPublishedDate(globalDateUtil.getCurrentDate());
        book.setPrice(478);
        book.setImageURL("incagnita.webp");
        book.setDescription("Why does your foot hit the brake pedal before you are conscious of danger ahead? *Why do you hear your name is mentioned in a conversation that you didn't think you were listening to? *Why is a person whose name begins with J more likely to marry another person whose name begins with J? *Why is it so difficult to keep a secret? *And how is it possible to get angry at yourself: who, exactly, is mad at whom? A thrilling subsurface exploration of the mind and all its contradictions. A NEW YORK TIMES BESTSELLER");
        book.setAddedDate(globalDateUtil.getCurrentDate());
        book.setAvailable(true);
        book.setCategory(category);
        book.setShelf(shelf);
        bookRepository.save(book);

        Book book1 = new Book();
        book1.setIsbn("9780393326260");
        book1.setTitle("Re-enchantment");
        book1.setAuthor("Jeffery Paine");
        book1.setLanguage("English");
        book1.setEdition("3rd");
        book1.setPageCount(278);
        book1.setTotalQuantity(22);
        book1.setPublishedDate(globalDateUtil.getCurrentDate());
        book1.setPrice(560);
        book1.setImageURL("reenchantment.webp");
        book1.setDescription("The colourful tale of the successful flowering of an obscure, ancient Eastern sect in the modern world. mountain people, associated with bizarre, almost medieval, superstitions, to perhaps the most rapidly growing and celebrity-studded religion in the West. numbers of Americans have found their way to the wisdom of Tibetan lamas in exile. Earthy, humorous, commonsensical, and eccentric, these flamboyant teachers; larger-than-life characters like Lama Yeshe and Chogyma Trungpa; proved to be charismatic and gifted ambassadors for their ancient religion. So did two Western women, born in Brooklyn and London's East End, whose home-grown religious intuitions turned out to be identical with the most sophisticated Tibetan teachings, revealing them to be reincarnated lamas. in page-turning, richly informative fashion how Tibetan Buddhism, rarified and sensual, mystical and commonsensical, became the ideal religion for a post-religious age.");
        book1.setAddedDate(globalDateUtil.getCurrentDate());
        book1.setAvailable(true);
        book1.setCategory(category);
        book1.setShelf(shelf);
        bookRepository.save(book1);

        Book book2 = new Book();
        book2.setIsbn("9780007258239");
        book2.setTitle("The Journey");
        book2.setAuthor("Brandon Bays");
        book2.setLanguage("English");
        book2.setEdition("1st");
        book2.setPageCount(208);
        book2.setTotalQuantity(21);
        book2.setPublishedDate(globalDateUtil.getCurrentDate());
        book2.setPrice(400);
        book2.setImageURL("The-Journey.webp");
        book2.setDescription("The Journey is a simple, revolutionary set of techniques that has freed thousands from lifelong emotional and physical blocks - from addiction, depression and low self-esteem to chronic pain and illness. Key Features Brandon Bays is developing a huge presence in the UK. Her sell-out lectures in London have made her the hottest name in personal development. She has been likened to a female Anthony Robbins and the next Louise Hay Bays will be actively marketing the book through huge sell-out workshops all over India As a superlead the book will be advertised in leading publications. Media interest is strong and building Quotes from Deepak Chopra, Anthony Robbins and Wayne Dyer About the Book: The Journey The Journey was born of Brandon Bays extraordinary experience of healing from a football-sized tumour, without drugs or surgery, in 6 weeks. Forced to go beyond the limits of known alternative therapies (she had been working in mind/body healing for two decades) she was catapulted into a remarkable, soul searching and ultimately ground-breaking healing journey. She pioneered a remarkable healing technique that guides us directly to the root cause of a longstanding difficulty- emotional or physical-and then gives us the tools to resolve it.");
        book2.setAddedDate(globalDateUtil.getCurrentDate());
        book2.setAvailable(true);
        book2.setCategory(category);
        book2.setShelf(shelf);
        bookRepository.save(book2);

        Book book3 = new Book();
        book3.setIsbn("9781614293514");
        book3.setTitle("Outgrowing God");
        book3.setAuthor("Richard Dawkins");
        book3.setLanguage("English");
        book3.setEdition("1st");
        book3.setPageCount(304);
        book3.setTotalQuantity(19);
        book3.setPublishedDate(globalDateUtil.getCurrentDate());
        book3.setPrice(958);
        book3.setImageURL("Outgrowing-God.webp");
        book3.setDescription("Should we believe in God? In this new book, written for a new generation, the brilliant science writer and author of The God Delusion, explains why we shouldn't. Should we believe in God? Do we need God in order to explain the existence of the universe? Do we need God in order to be good? In twelve chapters that address some of the most profound questions human beings confront, Dawkins marshals science, philosophy and comparative religion to interrogate the hypocrisies of all the religious systems and explain to readers of all ages how life emerged without a Creator, how evolution works and how our world came into being. For anyone hoping to grapple with the meaning of life and what to believe, Outgrowing God is a challenging, thrilling and revelatory read.");
        book3.setAddedDate(globalDateUtil.getCurrentDate());
        book3.setAvailable(true);
        book3.setCategory(category);
        book3.setShelf(shelf);
        bookRepository.save(book3);
        bookRepository.flush();

        Book book4 = new Book();
        book4.setIsbn("9781614293514");
        book4.setTitle("Awakening Together");
        book4.setAuthor("Larry Yang");
        book4.setLanguage("English");
        book4.setEdition("2nd");
        book4.setPageCount(280);
        book4.setTotalQuantity(15);
        book4.setPublishedDate(globalDateUtil.getCurrentDate());
        book4.setPrice(2136);
        book4.setImageURL("image_kkOAgrw.webp");
        book4.setDescription("“Awakening Together combines the intimately personal, the Buddhist and universal into a loving, courageous, important work that will benefit all who read it. For anyone who longs to collaborate and create a just and inclusive community, Larry provides a brilliant guidebook.” —Jack Kornfield, author of A Path With HeartHow can we connect our personal spiritual journeys with the larger course of our shared human experience? How do we compassionately and wisely navigate belonging and exclusion in our own hearts? And how can we embrace diverse identities and experiences within our spiritual communities, building sanghas that make good on the promise of liberation for everyone? If you aren’t sure how to start this work, Awakening Together is for you. If you’ve begun but aren’t sure what the next steps are, this book is for you. If you’re already engaged in this work, this book will remind you none of us do this work alone. Whether you find yourself at the center or at the margins of your community, whether you’re a community member or a community leader, this book is for you.");
        book4.setAddedDate(globalDateUtil.getCurrentDate());
        
        book4.setAvailable(true);
        book4.setCategory(category);
        book4.setShelf(shelf);
        bookRepository.save(book4);

        Book book5 = new Book();
        book5.setIsbn("9781614293514");
        book5.setTitle("Lateral Thinking");
        book5.setAuthor("Edward De Bono");
        book5.setLanguage("English");
        book5.setEdition("1st");
        book5.setPageCount(272);
        book5.setTotalQuantity(19);
        book5.setPublishedDate(globalDateUtil.getCurrentDate());
        book5.setPrice(638);
        book5.setImageURL("Lateral-Thinking.webp");
        book5.setDescription("THE classic work about improving creativity from world-renowned writer and philosopher Edward de Bono. In schools we are taught to meet problems head-on: what Edward de Bono calls 'vertical thinking'. This works well in simple situations - but we are at a loss when this approach fails. What then? Lateral thinking is all about freeing up your imagination. Through a series of special techniques, in groups or working alone, Edward de Bono shows how to stimulate the mind in new and exciting ways. Soon you will be looking at problems from a variety of angles and offering up solutions that are as ingenious as they are effective. You will become much more productive and a formidable thinker in your own right.");
        book5.setAddedDate(globalDateUtil.getCurrentDate());
        
        book5.setAvailable(true);
        book5.setCategory(category);
        book5.setShelf(shelf);
        bookRepository.save(book5);

        Book book6 = new Book();
        book6.setIsbn("9780893890773");
        book6.setTitle("Choosing a Path");
        book6.setAuthor("Swami Rama");
        book6.setLanguage("English");
        book6.setEdition("1st");
        book6.setPageCount(200);
        book6.setTotalQuantity(20);
        book6.setPublishedDate(globalDateUtil.getCurrentDate());
        book6.setPrice(472);
        book6.setImageURL("Choosing-a-Path.webp");
        book6.setDescription("Meet Jim Barton-new CEO of Santa Monica Aerospace. Jim's job won't be easy: the company's hemorrhaging cash, struggling to regain investors' trust after an accounting scandal, and striving to transform its military and manufacturing culture to become a global aerospace integrator. Jim isn't real; Harder Than I Thought is a novel. But his story-developed in consultation with seasoned, flesh-and-blood CEOs-contains crucial lessons for all chief executives. ");
        book6.setAddedDate(globalDateUtil.getCurrentDate());
        book6.setAvailable(true);
        book6.setCategory(category);
        book6.setShelf(shelf);
        bookRepository.save(book6);

        Book book7 = new Book();
        book7.setIsbn("9780857896995");
        book7.setTitle("Altruism");
        book7.setAuthor("Matthieu Ricard");
        book7.setLanguage("English");
        book7.setEdition("2nd");
        book7.setPageCount(849);
        book7.setTotalQuantity(22);
        book7.setPublishedDate(globalDateUtil.getCurrentDate());
        book7.setPrice(1118);
        book7.setImageURL("Altruism.webp");
        book7.setDescription("The new bestseller from Matthieu Ricard is the result of a lifetime's thought. This inspirational book argues that by understanding kindness and developing it as a skill we can change the world.");
        book7.setAddedDate(globalDateUtil.getCurrentDate());

        book7.setAvailable(true);
        book7.setCategory(category);
        book7.setShelf(shelf);
        bookRepository.save(book7);

        Book book8 = new Book();
        book8.setIsbn("9780857896995");
        book8.setTitle("Yoga for Life");
        book8.setAuthor("Colleen Saidman Yee");
        book8.setLanguage("English");
        book8.setEdition("2nd");
        book8.setPageCount(272);
        book8.setTotalQuantity(24);
        book8.setPublishedDate(globalDateUtil.getCurrentDate());
        book8.setPrice(958);
        book8.setImageURL("Yoga-for-Life.webp");
        book8.setDescription("From a rebellious young woman with a dangerous heroin habit to a globe-trotting fashion model to “First Lady of Yoga” (The New York Times), Colleen Saidman Yee tells the remarkable story of how she found herself through the healing power of yoga—and then inspired others to do the same.I’ve learned how to extract the beauty of an ordinary day. I’ve learned that the best high exists in the joy—or the sadness—of the present moment. Yoga allows me to surf the ripples and sit with the mud, while catching glimpses of the clarity of my home at the bottom of the lake: my true self. The very first time Saidman Yee took a yoga class, she left feeling inexplicably different—something inside had shifted. She felt alive—so alive that yoga became the center of her life, helping her come to terms with her insecurities and find her true identity and voice.");
        book8.setAddedDate(globalDateUtil.getCurrentDate());

        book8.setAvailable(true);
        book8.setCategory(category);
        book8.setShelf(shelf);
        bookRepository.save(book8);

        Book book9 = new Book();
        book9.setIsbn("9780241300688");
        book9.setTitle("Bittersweet");
        book9.setAuthor("Susan Cain");
        book9.setLanguage("English");
        book9.setEdition("4th");
        book9.setPageCount(296);
        book9.setTotalQuantity(24);
        book9.setPublishedDate(globalDateUtil.getCurrentDate());
        book9.setPrice(1278);
        book9.setImageURL("image_QlHEKqf.webp");
        book9.setDescription("With her mega-bestseller Quiet, Susan Cain urged our society to cultivate space for the undervalued, indispensable introverts among us, thereby revealing an untapped power hidden in plain sight. Now, she employs the same mix of research, storytelling, and memoir to explore why we experience sorrow and longing, and the surprising lessons these states of mind teach us about creativity, compassion, leadership, spirituality, mortality and love. Bittersweetness is a tendency to states of longing, poignancy, and sorrow; an acute awareness of passing time; and a curiously piercing joy when beholding beauty. It recognizes that light and dark, birth and death-bitter and sweet-are forever paired. ");
        book9.setAddedDate(globalDateUtil.getCurrentDate());
        book9.setAvailable(true);
        book9.setCategory(category);
        book9.setShelf(shelf);
        bookRepository.save(book8);

        bookRepository.flush();

        return category;
    }

    public Category categoryThree(){
        Category category = new Category();
        category.setName("Religion");
        category.setStartingNumber("200");
        category.setEndingNumber("299");
        category.setDescription("Religion books");
        category.setAddedDate(globalDateUtil.getCurrentDate());
        
        category.setPresent(true);
        category = categoryRepository.save(category);
        categoryRepository.flush();

        Shelf shelf = new Shelf();
        shelf.setName("Cedar Lane");
        shelf.setTotalCapacity(34);
        shelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        shelf.setDescription("Fresh and earthy");
        shelf.setCategory(category);
        shelf.setPresent(true);
        shelf = shelfRepository.save(shelf);

        Book book1 = new Book();
        book1.setIsbn("9780143032373");
        book1.setTitle("Spouse");
        book1.setAuthor("Shobhaa Dé");
        book1.setLanguage("English");
        book1.setEdition("2nd");
        book1.setPageCount(287);
        book1.setTotalQuantity(15);
        book1.setPublishedDate(globalDateUtil.getCurrentDate());
        book1.setPrice(400);
        book1.setImageURL("thumbnail-fc1891d7-766c-4a3d-b16a-9804fa04a853.webp");
        book1.setDescription("Marriage is an adventure, says Shobhaa De, celebrity writer, devoted wife and mother of six. It's about trust, companionship, affection and sharing. It's also about learning to cope with your partner's moods and eccentricities. Not to mention the delicate balancing act between parents, children, friends and a career, and the sometimes overpowering need to get away from it all. In this delightful book on society's most debated institution, Shobhaa De writes about how and why marriages work - or don't. With her usual disregard for rules, she reinvents tradition and challenges old stereotypes, addressing all the issues that are central to most Indian marriages- the saas-bahu conundrum (how to escape the role-trap and enjoy each other), the need for honesty (aren't some secrets better left secret?), the importance of romance (no, expressions of love are not unmanly!), and not any less important, how to recognize the warning signs in a hopeless relationship and run before it's too late.");
        book1.setAddedDate(globalDateUtil.getCurrentDate());
        
        book1.setAvailable(true);
        book1.setCategory(category);
        book1.setShelf(shelf);
        bookRepository.save(book1);
        bookRepository.flush();

        return category;
    }

    public Category categoryFour(){
        Category category = new Category();
        category.setName("Social Science");
        category.setStartingNumber("300");
        category.setEndingNumber("399");
        category.setDescription("Social Science books");
        category.setAddedDate(globalDateUtil.getCurrentDate());
        
        category.setPresent(true);
        category = categoryRepository.save(category);
        categoryRepository.flush();

        Shelf shelf = new Shelf();
        shelf.setName("Meadow");
        shelf.setTotalCapacity(38);
        shelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        shelf.setDescription("Calm and open");
        shelf.setCategory(category);
        shelf.setPresent(true);
        shelf = shelfRepository.save(shelf);


        Book book1 = new Book();
        book1.setIsbn("9789354892035");
        book1.setTitle("INDIA VS UK");
        book1.setAuthor(" Syed. Akbaruddin");
        book1.setLanguage("English");
        book1.setEdition("1st");
        book1.setPageCount(211);
        book1.setTotalQuantity(26);
        book1.setPublishedDate(globalDateUtil.getCurrentDate());
        book1.setPrice(958);
        book1.setImageURL("indiavsuk.webp");
        book1.setDescription("From the revolt of 1857 and the freedom movement to duels on the cricket pitch, India and the United Kingdom have been on opposing sides on numerous occasions. A less known instance when this dynamic played out was the 2017 election for a seat on the International Court of Justice. Unwilling at first, India was prompted to enter the ring in the wake of the Kulbhushan Jadhav case. The contest that followed proved to be a 'second war of Independence' in the words of then foreign minister Sushma Swaraj - and a David-and-Goliath fight against the permanent members of the Security Council, who all put their might behind the UK. Syed Akbaruddin, India's Permanent Representative to the UN at the time, presents a behind-the-scenes account of India's coming-of-age in world affairs through the prism of this momentous election.");
        book1.setAddedDate(globalDateUtil.getCurrentDate());
        
        book1.setAvailable(true);
        book1.setCategory(category);
        book1.setShelf(shelf);
        bookRepository.save(book1);
        bookRepository.flush();

        return category;
    }

    public Category categoryFive(){
        Category category = new Category();
        category.setName("Languages");
        category.setStartingNumber("400");
        category.setEndingNumber("499");
        category.setDescription("Language books");
        category.setAddedDate(globalDateUtil.getCurrentDate());
        
        category.setPresent(true);
        category = categoryRepository.save(category);
        categoryRepository.flush();

        Shelf shelf = new Shelf();
        shelf.setName("Nest");
        shelf.setTotalCapacity(34);
        shelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        shelf.setDescription("Cozy place for stories");
        shelf.setCategory(category);
        shelf.setPresent(true);
        shelf = shelfRepository.save(shelf);

        Book book1 = new Book();
        book1.setIsbn("9780877018490");
        book1.setTitle("Tibet in Exile");
        book1.setAuthor("Raghu Rai");
        book1.setLanguage("English");
        book1.setEdition("1st");
        book1.setPageCount(139);
        book1.setTotalQuantity(24);
        book1.setPublishedDate(globalDateUtil.getCurrentDate());
        book1.setPrice(1950);
        book1.setImageURL("Tibet-in-Exile.webp");
        book1.setDescription("This remarkable photographic volume offers a unique insight into the community of 100,000 Tibetans who have been living in exile under the leaderships of their spiritual leader, the 14th Dalai Lama. The book's historical text and dynamic photographs give the reader an awareness of the importance of Tibet's situation in today's changing political climate. 100 color photographs.");
        book1.setAddedDate(globalDateUtil.getCurrentDate());
        
        book1.setAvailable(true);
        book1.setCategory(category);
        book1.setShelf(shelf);
        bookRepository.save(book1);
        bookRepository.flush();

        return category;
    }

    public Category categorySix(){
        Category category = new Category();
        category.setName("Natural Science");
        category.setStartingNumber("500");
        category.setEndingNumber("599");
        category.setDescription("Natual Science books");
        category.setAddedDate(globalDateUtil.getCurrentDate());
        
        category.setPresent(true);
        category = categoryRepository.save(category);
        categoryRepository.flush();

        Shelf shelf = new Shelf();
        shelf.setName("Birchwood");
        shelf.setTotalCapacity(35);
        shelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        shelf.setDescription("Bright and elegant");
        shelf.setCategory(category);
        shelf.setPresent(true);
        shelf = shelfRepository.save(shelf);
        shelfRepository.flush();

        Book book = new Book();
        book.setIsbn("9780552177177");
        book.setTitle("Origin");
        book.setAuthor("Dan Brown");
        book.setLanguage("English");
        book.setEdition("2nd");
        book.setPageCount(541);
        book.setTotalQuantity(23);
        book.setPublishedDate(globalDateUtil.getCurrentDate());
        book.setPrice(638);
        book.setImageURL("Origin.webp");
        book.setDescription("Robert Langdon, Harvard professor of symbology and religious iconology, arrives at the Guggenheim Museum Bilbao to attend the unveiling of an astonishing scientific breakthrough. The evening's host is billionaire Edmond Kirsch, a futurist whose dazzling high-tech inventions and audacious predictions have made him a controversial figure around the world. But Langdon and several hundred guests are left reeling when the meticulously orchestrated evening is suddenly blown apart. There is a real danger that Kirsch's precious discovery may be lost in the ensuing chaos. With his life under threat, Langdon is forced into a desperate bid to escape Bilbao, taking with him the museum's director, Ambra Vidal. Together they flee to Barcelona on a perilous quest to locate a cryptic password that will unlock Kirsch's secret. To evade a devious enemy who is one step ahead of them at every turn, Langdon and Vidal must navigate the labyrinthine passageways of extreme religion and hidden history. On a trail marked only by enigmatic symbols and elusive modern art, Langdon and Vidal will come face-to-face with a breathtaking truth that has remained buried - until now.");
        book.setAddedDate(globalDateUtil.getCurrentDate());
        
        book.setAvailable(true);
        book.setCategory(category);
        book.setShelf(shelf);
        bookRepository.save(book);
        bookRepository.flush();

        return category;
    }

    public Category categorySeven(){
        Category category = new Category();
        category.setName("Applied Science");
        category.setStartingNumber("600");
        category.setEndingNumber("699");
        category.setDescription("Applied Science books");
        category.setAddedDate(globalDateUtil.getCurrentDate());
        
        category.setPresent(true);
        category = categoryRepository.save(category);
        categoryRepository.flush();

        Shelf shelf = new Shelf();
        shelf.setName("Vista");
        shelf.setTotalCapacity(37);
        shelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        shelf.setDescription("Wide view of ideas");
        shelf.setCategory(category);
        shelf.setPresent(true);
        shelf = shelfRepository.save(shelf);

        Book book = new Book();
        book.setIsbn("9780141036250");
        book.setTitle("Outliers");
        book.setAuthor("Malcolm Gladwell");
        book.setLanguage("English");
        book.setEdition("4th");
        book.setPageCount(320);
        book.setTotalQuantity(25);
        book.setPublishedDate(globalDateUtil.getCurrentDate());
        book.setPrice(1040);
        book.setImageURL("thumbnail-5d802fd5-5922-470c-9b58-02ddbaa3f69a.webp");
        book.setDescription("A fizzingly entertaining and enlighting book' Daily Mail'Gladwell is not only a brilliant storyteller; he can see what those stories tell us, the lessons they contain' GuardianWhy do some people achieve so much more than others? Can they lie so far out of the ordinary?In his provocative and inspiring new book, Malcolm Gladwell looks at everyone from rock stars to professional athletes, software billionaires to scientific geniuses, to show that the story of success is far more surprising, than we could ever have imagined. He reveals that it's as much about where we're from and what we do, as who we are - and that no one, not even a genius, ever makes it alone.Outlierswill change the way you think about your own life story, and about what makes us all unique.'Malcolm Gladwell is a global phenomenon . . . he has a genius for making everything he writes seem like an impossible adventure' Observer 'Exceptionally well-written . . . I wanted to cheer or clap' Evening Standard 'Gladwell deploys a wealth of fascinating data and information' Financial Times 'He is the best kind of writer - the kind who makes you feel like you're a genius, rather than that he's a genius' The Times");
        book.setAddedDate(globalDateUtil.getCurrentDate());
        
        book.setAvailable(true);
        book.setCategory(category);
        book.setShelf(shelf);
        bookRepository.save(book);

        Book book1 = new Book();
        book1.setIsbn("9780749386061");
        book1.setTitle("Chaos");
        book1.setAuthor("James Gleick");
        book1.setLanguage("English");
        book1.setEdition("3rd");
        book1.setPageCount(352);
        book1.setTotalQuantity(23);
        book1.setPublishedDate(globalDateUtil.getCurrentDate());
        book1.setPrice(1118);
        book1.setImageURL("9780749386061-4929.webp");
        book1.setDescription("This book brings together different work in the new field of physics called the chaos theory, an extension of classical mechanics, in which simple and complex causes are seen to interact. Mathematics may only be able to solve simple linear equations which experiment has pushed nature into obeying in a limited way, but now that computers can map the whole plane of solutions of non-linear equations a new vision of nature is revealed. The implications are staggeringly universal in all areas of scientific work and philosophical thought.");
        book1.setAddedDate(globalDateUtil.getCurrentDate());
        
        book1.setAvailable(true);
        book1.setCategory(category);
        book1.setShelf(shelf);
        bookRepository.save(book1);
        bookRepository.flush();

        return category;
    }

    public Category categoryEight(){
        Category category = new Category();
        category.setName("Arts and Recreation");
        category.setStartingNumber("700");
        category.setEndingNumber("799");
        category.setDescription("Arts and Recreation books");
        category.setAddedDate(globalDateUtil.getCurrentDate());
        
        category.setPresent(true);
        category = categoryRepository.save(category);
        categoryRepository.flush();

        Shelf shelf = new Shelf();
        shelf.setName("Brook");
        shelf.setTotalCapacity(33);
        shelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        shelf.setDescription("Gentle, flowing stories");
        shelf.setCategory(category);
        shelf.setPresent(true);
        shelf = shelfRepository.save(shelf);

        Book book1 = new Book();
        book1.setIsbn("9789390260041");
        book1.setTitle("Vastu");
        book1.setAuthor("Robert E. Svaboda");
        book1.setLanguage("English");
        book1.setEdition("2nd");
        book1.setPageCount(294);
        book1.setTotalQuantity(24);
        book1.setPublishedDate(globalDateUtil.getCurrentDate());
        book1.setPrice(632);
        book1.setImageURL("9789390260041-3409.webp");
        book1.setDescription("Robert E. Svoboda's Vāstu: Breathing Life into Space addresses the classical Indian art (or science) of architectural form, Vāstu, in a wholly unique way. Instead of presenting lists of rules and architectural principles to which builders and interior designers must scrupulously adhere at all times, the work sensitizes the reader to the dynamics of space, alignment, and form in ever-expanding orbits of individual life. The book allows readers and home builders to understand the complex dynamics of individual, terrestrial, and celestial energetic systems leading to the greater synergy between space, nature and the individual.");
        book1.setAddedDate(globalDateUtil.getCurrentDate());
        
        book1.setAvailable(true);
        book1.setCategory(category);
        book1.setShelf(shelf);
        bookRepository.save(book1);
        bookRepository.flush();

        return category;
    }

    public Category categoryNine(){
        Category category = new Category();
        category.setName("Literature");
        category.setStartingNumber("800");
        category.setEndingNumber("899");
        category.setDescription("Arts and Recreation books");
        category.setAddedDate(globalDateUtil.getCurrentDate());
        
        category.setPresent(true);
        category = categoryRepository.save(category);
        categoryRepository.flush();

        Shelf shelf = new Shelf();
        shelf.setName("Pinecrest");
        shelf.setTotalCapacity(34);
        shelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        shelf.setDescription("Strong and high-reaching");
        shelf.setCategory(category);
        shelf.setPresent(true);
        shelf = shelfRepository.save(shelf);

        Book book1 = new Book();
        book1.setIsbn("9780552155472");
        book1.setTitle("Alentejo Blue");
        book1.setAuthor("Monica Ali");
        book1.setLanguage("English");
        book1.setEdition("1st");
        book1.setPageCount(301);
        book1.setTotalQuantity(27);
        book1.setPublishedDate(globalDateUtil.getCurrentDate());
        book1.setPrice(454);
        book1.setImageURL("Alentejo-Blue.webp");
        book1.setDescription("Alentejo Blue is the story of the Portuguese village of Mamarrosa told through the lives of those who live there and those who are passing through - men and women, children and old people, locals, tourists and expatriates. For some, such as Teresa, a beautiful, dreamy village girl, it is a place from which to escape; for others - the dysfunctional Potts family - it is a way of running from trouble (but not eluding it). Vasco, a café owner who has never recovered from the death of his American wife, clings to a notion that his years in America make him superior to the other villagers. One English tourist makes Mamarrosa the subject of her fantasy of a new life, while for her compatriots, a young engaged couple, Mamarrosa is where their dreams finally fall apart. At the book's opening an old man reflects on his long and troubled life in this beautiful and seemingly tranquil setting, and anticipates the return of Marco Afonso Rodrigues, the prodigal son of the village and a symbol of this now fast-changing world. The homecoming is the subject of continuing speculation, and when Marco Afonso Rodrigues does finally appear, villagers, tourists and expatriates are brought together and jealousies, passions and disappointments must inevitably collide.");
        book1.setAddedDate(globalDateUtil.getCurrentDate());
        
        book1.setAvailable(true);
        book1.setCategory(category);
        book1.setShelf(shelf);
        bookRepository.save(book1);
        bookRepository.flush();


        Category mathematicsCategory = new Category();
        mathematicsCategory.setName("Mathematics");
        mathematicsCategory.setStartingNumber("510");
        mathematicsCategory.setEndingNumber("519");
        mathematicsCategory.setDescription("Numbers and formulas");
        mathematicsCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        mathematicsCategory.setPresent(true);
        mathematicsCategory = categoryRepository.save(mathematicsCategory);

        Category astronomyCategory = new Category();
        astronomyCategory.setName("Astronomy");
        astronomyCategory.setStartingNumber("520");
        astronomyCategory.setEndingNumber("529");
        astronomyCategory.setDescription("Stars and planets");
        astronomyCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        astronomyCategory.setPresent(true);
        astronomyCategory = categoryRepository.save(astronomyCategory);

        Category physicsCategory = new Category();
        physicsCategory.setName("Physics");
        physicsCategory.setStartingNumber("530");
        physicsCategory.setEndingNumber("539");
        physicsCategory.setDescription("Matter and energy");
        physicsCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        physicsCategory.setPresent(true);
        physicsCategory = categoryRepository.save(physicsCategory);

        Category chemistryCategory = new Category();
        chemistryCategory.setName("Chemistry");
        chemistryCategory.setStartingNumber("540");
        chemistryCategory.setEndingNumber("549");
        chemistryCategory.setDescription("Elements and reactions");
        chemistryCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        chemistryCategory.setPresent(true);
        chemistryCategory = categoryRepository.save(chemistryCategory);

        Category earthScienceCategory = new Category();
        earthScienceCategory.setName("Earth Science");
        earthScienceCategory.setStartingNumber("550");
        earthScienceCategory.setEndingNumber("559");
        earthScienceCategory.setDescription("Rocks and weather");
        earthScienceCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        earthScienceCategory.setPresent(true);
        earthScienceCategory = categoryRepository.save(earthScienceCategory);

        Category biologyCategory = new Category();
        biologyCategory.setName("Biology");
        biologyCategory.setStartingNumber("570");
        biologyCategory.setEndingNumber("579");
        biologyCategory.setDescription("Life and organisms");
        biologyCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        biologyCategory.setPresent(true);
        biologyCategory = categoryRepository.save(biologyCategory);

        Category medicineCategory = new Category();
        medicineCategory.setName("Medicine");
        medicineCategory.setStartingNumber("610");
        medicineCategory.setEndingNumber("619");
        medicineCategory.setDescription("Health and treatment");
        medicineCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        medicineCategory.setPresent(true);
        medicineCategory = categoryRepository.save(medicineCategory);

        Category agricultureCategory = new Category();
        agricultureCategory.setName("Agriculture");
        agricultureCategory.setStartingNumber("630");
        agricultureCategory.setEndingNumber("639");
        agricultureCategory.setDescription("Farming and crops");
        agricultureCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        agricultureCategory.setPresent(true);
        agricultureCategory = categoryRepository.save(agricultureCategory);

        Category businessCategory = new Category();
        businessCategory.setName("Business");
        businessCategory.setStartingNumber("650");
        businessCategory.setEndingNumber("659");
        businessCategory.setDescription("Trade and management");
        businessCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        businessCategory.setPresent(true);
        businessCategory = categoryRepository.save(businessCategory);

        Category engineeringCategory = new Category();
        engineeringCategory.setName("Engineering");
        engineeringCategory.setStartingNumber("620");
        engineeringCategory.setEndingNumber("629");
        engineeringCategory.setDescription("Building and machines");
        engineeringCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        engineeringCategory.setPresent(true);
        engineeringCategory = categoryRepository.save(engineeringCategory);

        categoryRepository.flush();

        Shelf mathShelf = new Shelf();
        mathShelf.setName("MathNest");
        mathShelf.setTotalCapacity(25);
        mathShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        mathShelf.setDescription("Math books zone");
        mathShelf.setCategory(mathematicsCategory);
        mathShelf.setPresent(true);
        mathShelf = shelfRepository.save(mathShelf);

        Shelf astroShelf = new Shelf();
        astroShelf.setName("StarVault");
        astroShelf.setTotalCapacity(20);
        astroShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        astroShelf.setDescription("Space and stars");
        astroShelf.setCategory(astronomyCategory);
        astroShelf.setPresent(true);
        astroShelf = shelfRepository.save(astroShelf);

        Shelf physicsShelf = new Shelf();
        physicsShelf.setName("ForceRack");
        physicsShelf.setTotalCapacity(30);
        physicsShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        physicsShelf.setDescription("Physics area");
        physicsShelf.setCategory(physicsCategory);
        physicsShelf.setPresent(true);
        physicsShelf = shelfRepository.save(physicsShelf);

        Shelf chemistryShelf = new Shelf();
        chemistryShelf.setName("ChemBay");
        chemistryShelf.setTotalCapacity(28);
        chemistryShelf.setAddedDate(globalDateUtil.getCurrentDate());
        chemistryShelf.setDescription("Chemical works");
        chemistryShelf.setCategory(chemistryCategory);
        chemistryShelf.setPresent(true);
        chemistryShelf = shelfRepository.save(chemistryShelf);

        Shelf earthShelf = new Shelf();
        earthShelf.setName("GeoCorner");
        earthShelf.setTotalCapacity(22);
        earthShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        earthShelf.setDescription("Earth science");
        earthShelf.setCategory(earthScienceCategory);
        earthShelf.setPresent(true);
        earthShelf = shelfRepository.save(earthShelf);

        Shelf bioShelf = new Shelf();
        bioShelf.setName("BioShelf");
        bioShelf.setTotalCapacity(26);
        bioShelf.setAddedDate(globalDateUtil.getCurrentDate());
        bioShelf.setDescription("Life studies");
        bioShelf.setCategory(biologyCategory);
        bioShelf.setPresent(true);
        bioShelf = shelfRepository.save(bioShelf);

        Shelf medicineShelf = new Shelf();
        medicineShelf.setName("MediRack");
        medicineShelf.setTotalCapacity(18);
        medicineShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        medicineShelf.setDescription("Health zone");
        medicineShelf.setCategory(medicineCategory);
        medicineShelf.setPresent(true);
        medicineShelf = shelfRepository.save(medicineShelf);

        Shelf agricultureShelf = new Shelf();
        agricultureShelf.setName("AgroBlock");
        agricultureShelf.setTotalCapacity(24);
        agricultureShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        agricultureShelf.setDescription("Farming zone");
        agricultureShelf.setCategory(agricultureCategory);
        agricultureShelf.setPresent(true);
        agricultureShelf = shelfRepository.save(agricultureShelf);

        Shelf businessShelf = new Shelf();
        businessShelf.setName("BizStack");
        businessShelf.setTotalCapacity(21);
        businessShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        businessShelf.setDescription("Business books");
        businessShelf.setCategory(businessCategory);
        businessShelf.setPresent(true);
        businessShelf = shelfRepository.save(businessShelf);

        Shelf engineeringShelf = new Shelf();
        engineeringShelf.setName("EngVault");
        engineeringShelf.setTotalCapacity(29);
        engineeringShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        engineeringShelf.setDescription("Tech and machines");
        engineeringShelf.setCategory(engineeringCategory);
        engineeringShelf.setPresent(true);
        engineeringShelf = shelfRepository.save(engineeringShelf);

        shelfRepository.flush();

        return category;
    }

    public Category categoryTen(){
        Category category = new Category();
        category.setName("Geography");
        category.setStartingNumber("900");
        category.setEndingNumber("999");
        category.setDescription("Arts and Recreation books");
        category.setAddedDate(globalDateUtil.getCurrentDate());
        
        category.setPresent(true);

        Category environmentalCategory = new Category();
        environmentalCategory.setName("Environmental Science");
        environmentalCategory.setStartingNumber("580");
        environmentalCategory.setEndingNumber("589");
        environmentalCategory.setDescription("Plants, ecosystems, and conservation");
        environmentalCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        environmentalCategory.setPresent(true);
        environmentalCategory = categoryRepository.save(environmentalCategory);

        Shelf ecoShelf = new Shelf();
        ecoShelf.setName("EcoHaven");
        ecoShelf.setTotalCapacity(26);
        ecoShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        ecoShelf.setDescription("Environmental science books zone");
        ecoShelf.setCategory(environmentalCategory);
        ecoShelf.setPresent(true);
        ecoShelf = shelfRepository.save(ecoShelf);

// ----------------------------------------

        Category psychologyCategory = new Category();
        psychologyCategory.setName("Psychology");
        psychologyCategory.setStartingNumber("150");
        psychologyCategory.setEndingNumber("159");
        psychologyCategory.setDescription("Mind and behavior studies");
        psychologyCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        psychologyCategory.setPresent(true);
        psychologyCategory = categoryRepository.save(psychologyCategory);

        Shelf psycheShelf = new Shelf();
        psycheShelf.setName("MindSpace");
        psycheShelf.setTotalCapacity(20);
        psycheShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        psycheShelf.setDescription("Psychology and mind studies");
        psycheShelf.setCategory(psychologyCategory);
        psycheShelf.setPresent(true);
        psycheShelf = shelfRepository.save(psycheShelf);

// ----------------------------------------

        Category computerScienceCategory = new Category();
        computerScienceCategory.setName("Computer Science");
        computerScienceCategory.setStartingNumber("000");
        computerScienceCategory.setEndingNumber("099");
        computerScienceCategory.setDescription("Information, computing, and AI");
        computerScienceCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        computerScienceCategory.setPresent(true);
        computerScienceCategory = categoryRepository.save(computerScienceCategory);

        Shelf compShelf = new Shelf();
        compShelf.setName("TechSphere");
        compShelf.setTotalCapacity(35);
        compShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        compShelf.setDescription("Computers and technology");
        compShelf.setCategory(computerScienceCategory);
        compShelf.setPresent(true);
        compShelf = shelfRepository.save(compShelf);

// ----------------------------------------

        Category literatureCategory = new Category();
        literatureCategory.setName("World Literature");
        literatureCategory.setStartingNumber("800");
        literatureCategory.setEndingNumber("899");
        literatureCategory.setDescription("Global literary works and poetry");
        literatureCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        literatureCategory.setPresent(true);
        literatureCategory = categoryRepository.save(literatureCategory);

        Shelf litShelf = new Shelf();
        litShelf.setName("LitLounge");
        litShelf.setTotalCapacity(40);
        litShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        litShelf.setDescription("Literature and poetry zone");
        litShelf.setCategory(literatureCategory);
        litShelf.setPresent(true);
        litShelf = shelfRepository.save(litShelf);

// ----------------------------------------

        Category lawCategory = new Category();
        lawCategory.setName("Law and Justice");
        lawCategory.setStartingNumber("340");
        lawCategory.setEndingNumber("349");
        lawCategory.setDescription("Legal systems and judiciary");
        lawCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        lawCategory.setPresent(true);
        lawCategory = categoryRepository.save(lawCategory);

        Shelf lawShelf = new Shelf();
        lawShelf.setName("JusticeShelf");
        lawShelf.setTotalCapacity(22);
        lawShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        lawShelf.setDescription("Law and justice books");
        lawShelf.setCategory(lawCategory);
        lawShelf.setPresent(true);
        lawShelf = shelfRepository.save(lawShelf);

// ----------------------------------------

        Category artsCategory = new Category();
        artsCategory.setName("Fine Arts");
        artsCategory.setStartingNumber("700");
        artsCategory.setEndingNumber("709");
        artsCategory.setDescription("Visual arts and creativity");
        artsCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        artsCategory.setPresent(true);
        artsCategory = categoryRepository.save(artsCategory);

        Shelf artShelf = new Shelf();
        artShelf.setName("CanvasBay");
        artShelf.setTotalCapacity(30);
        artShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        artShelf.setDescription("Artistic expression zone");
        artShelf.setCategory(artsCategory);
        artShelf.setPresent(true);
        artShelf = shelfRepository.save(artShelf);

// ----------------------------------------

        Category musicCategory = new Category();
        musicCategory.setName("Music Studies");
        musicCategory.setStartingNumber("780");
        musicCategory.setEndingNumber("789");
        musicCategory.setDescription("Musical theory and practice");
        musicCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        musicCategory.setPresent(true);
        musicCategory = categoryRepository.save(musicCategory);

        Shelf musicShelf = new Shelf();
        musicShelf.setName("MelodyStack");
        musicShelf.setTotalCapacity(24);
        musicShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        musicShelf.setDescription("Musical books and notes");
        musicShelf.setCategory(musicCategory);
        musicShelf.setPresent(true);
        musicShelf = shelfRepository.save(musicShelf);

// ----------------------------------------

        Category philosophyCategory = new Category();
        philosophyCategory.setName("Philosophy and Ethics");
        philosophyCategory.setStartingNumber("100");
        philosophyCategory.setEndingNumber("109");
        philosophyCategory.setDescription("Thought, reason, and moral studies");
        philosophyCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        philosophyCategory.setPresent(true);
        philosophyCategory = categoryRepository.save(philosophyCategory);

        Shelf philosophyShelf = new Shelf();
        philosophyShelf.setName("ThoughtCorner");
        philosophyShelf.setTotalCapacity(18);
        philosophyShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        philosophyShelf.setDescription("Philosophy and ethics area");
        philosophyShelf.setCategory(philosophyCategory);
        philosophyShelf.setPresent(true);
        philosophyShelf = shelfRepository.save(philosophyShelf);

// ----------------------------------------

        Category culinaryCategory = new Category();
        culinaryCategory.setName("Culinary Arts");
        culinaryCategory.setStartingNumber("640");
        culinaryCategory.setEndingNumber("649");
        culinaryCategory.setDescription("Cooking and nutrition");
        culinaryCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        culinaryCategory.setPresent(true);
        culinaryCategory = categoryRepository.save(culinaryCategory);

        Shelf culinaryShelf = new Shelf();
        culinaryShelf.setName("KitchenNook");
        culinaryShelf.setTotalCapacity(19);
        culinaryShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        culinaryShelf.setDescription("Culinary books and recipes");
        culinaryShelf.setCategory(culinaryCategory);
        culinaryShelf.setPresent(true);
        culinaryShelf = shelfRepository.save(culinaryShelf);

// ----------------------------------------

        Category sportsCategory = new Category();
        sportsCategory.setName("Sports Science");
        sportsCategory.setStartingNumber("790");
        sportsCategory.setEndingNumber("799");
        sportsCategory.setDescription("Games, physical education, and sports");
        sportsCategory.setAddedDate(globalDateUtil.getCurrentDate());
        
        sportsCategory.setPresent(true);
        sportsCategory = categoryRepository.save(sportsCategory);

        Shelf sportsShelf = new Shelf();
        sportsShelf.setName("ArenaRack");
        sportsShelf.setTotalCapacity(23);
        sportsShelf.setAddedDate(globalDateUtil.getCurrentDate());
        
        sportsShelf.setDescription("Sports and fitness zone");
        sportsShelf.setCategory(sportsCategory);
        sportsShelf.setPresent(true);
        sportsShelf = shelfRepository.save(sportsShelf);

        shelfRepository.flush();
        categoryRepository.flush();

        return categoryRepository.save(category);
    }

}
