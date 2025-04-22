import React, { useEffect, useState } from "react";
import {
  Book,
  Calendar,
  ChevronDown,
  ChevronUp,
  Globe,
  Hash,
  Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import GLOBAL_SERVICE, {
  BACKEND_SERVER_BASE_URL,
} from "@/services/GlobalServices";
import AddToWishList from "./AddToWishList";

export default function ViewSpecificBook() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState({});

  const getBook = async () => {
    try {
      const response = await GLOBAL_SERVICE.get(
        `/api/v1/la/book/get/${bookId}`
      );
      console.log(response);
      if (response?.status === 200 && Object.keys(response?.data).length > 0) {
        setBook(response?.data);
      }
    } catch (error) {
      if (
        error.status === 404 ||
        error.status === 500 ||
        error.status === 400
      ) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getBook();
  }, []);

  useEffect(() => {
    console.log(book);
    console.log(book?.title);
    console.log(`${BACKEND_SERVER_BASE_URL}${book?.imageURL}`);
  }, [book]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="md:sticky md:top-24">
            <div className="p-6 rounded-lg flex flex-col space-y-3 justify-center items-center h-auto">
              <img
                src={`${BACKEND_SERVER_BASE_URL}${book?.imageURL}`}
                alt="Nexus: A Brief History of Information Networks from the Stone Age to AI"
                className="object-cover"
              />
              <Badge variant="outline" className="px-3 py-1 bg-blue-100">
                {book?.quantity > 0 ? (
                  <span className="text-sm font-medium text-[#206ea6] bg-blue-100">
                    Available
                  </span>
                ) : (
                  <span className="text-sm font-medium text-red-500">
                    Not Available
                  </span>
                )}
              </Badge>

              <Button
                //   onClick={handleAddToWishlist}
                className="w-full bg-white border-1 border-[#206ea6] text-[#206ea6] uppercase hover:bg-[#206ea6] hover:text-white rounded-none"
              >
                Add to WishList
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-xl md:text-3xl lg:text-3xl font-bold leading-tight mb-2 mt-13">
            Nexus: A Brief History of Information Networks from the Stone Age to
            AI
          </h1>
          <p className="text-lg text-gray-600 mb-6">by Yuval Noah Harari</p>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Synopsis</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro,
                facere! Provident, voluptate aperiam optio voluptas iure vel,
                dignissimos aspernatur adipisci saepe accusantium quisquam
                assumenda, expedita atque dolorem odit totam perspiciatis!
                Consequuntur veritatis aut dolore a eveniet adipisci sit
                accusantium est quod natus? Id et fuga eaque dignissimos, ut vel
                eos corporis rem aliquid praesentium ea voluptatum, officia
                atque, quo molestiae. Id voluptatibus magni eum placeat. Magnam
                quod vero, dolores ducimus libero vitae illum animi rem nesciunt
                nam adipisci eligendi, error, iure expedita sequi sint
                reprehenderit. Minus quis laborum doloribus magni! Eaque, sequi
                quaerat doloribus veritatis, culpa repudiandae corporis ut quo
                dolores aut sed, corrupti rerum accusamus eos? Animi quos maxime
                odit nemo ex molestiae iste! Repellat doloribus quidem magni
                iure! Dolorem asperiores earum rerum omnis ipsam? Explicabo
                sapiente delectus debitis enim error magnam accusamus quasi
                commodi nesciunt at molestiae, nam atque consectetur dolore unde
                quaerat maxime porro labore doloribus? Fugit. Nobis omnis
                tempora quas rerum provident atque temporibus, vero, aut nulla
                molestias qui numquam debitis incidunt eum ut sed fugiat
                doloremque voluptate velit neque vitae laudantium quidem libero
                earum. Ipsa. Animi tempora a commodi nostrum non nemo, vel
                aliquid iure quaerat, dicta saepe. Voluptas similique voluptatem
                et magnam dicta, corporis adipisci id quod corrupti dolorem
                tenetur quisquam reiciendis recusandae deleniti. Possimus, odit
                quam quisquam esse, debitis deserunt earum ex incidunt id
                officia nostrum dolore iste ab consequatur harum ipsam illo qui?
                Corporis facilis, quae similique distinctio nostrum a minus
                mollitia. Neque unde beatae, similique repellendus optio eius,
                consequuntur exercitationem, nemo odit delectus voluptate animi
                assumenda perspiciatis consequatur doloribus officia expedita
                eum! Cum at excepturi ex fugit consequuntur consequatur aperiam
                harum. Nulla corporis odio, natus impedit omnis nostrum
                consequuntur dolorum maiores. Libero impedit aut vero facilis
                officiis dignissimos provident fuga sit ea facere hic similique,
                quo quaerat accusamus inventore vitae asperiores! Distinctio
                voluptate consectetur quia fugit? Eos, laborum voluptatem, a
                itaque mollitia accusamus atque voluptatibus deserunt sit
                molestiae, repudiandae provident deleniti placeat dolore nobis
                culpa veniam consectetur. Cumque dolorem eaque consequuntur.
                Impedit accusantium aut aspernatur molestias, debitis
                consectetur consequatur quisquam ea! Ad facilis unde temporibus
                blanditiis molestiae tempore libero placeat nulla consequuntur,
                beatae, molestias ipsam rem officiis, sequi aliquid harum modi.
                Odit temporibus, distinctio voluptatum natus pariatur tempora
                voluptatibus illo eveniet ipsum corrupti error non ducimus
                consequuntur maxime. Asperiores ipsa quisquam quae optio libero
                voluptatem reiciendis sit natus sed corrupti! Tempora! Harum
                quibusdam ipsum amet delectus error! Quod ratione adipisci
                mollitia debitis totam vitae earum facere asperiores
                exercitationem, necessitatibus doloremque alias repellat laborum
                numquam tempora nulla atque illo odio maxime? Est? Sapiente
                maxime rerum earum numquam. Minus magni odit ut molestias
                voluptatum magnam laboriosam blanditiis! Ipsum saepe, dolorum
                exercitationem deserunt omnis numquam ab quae, pariatur ipsam
                explicabo id voluptates. Beatae, in. Quis, deserunt amet
                quibusdam eius aut nobis nulla est. Temporibus explicabo veniam,
                enim natus aut, fugit quam voluptate laborum ratione officia
                aspernatur soluta culpa quidem suscipit facere atque saepe a?
                Iure blanditiis, omnis sapiente impedit, veniam vitae
                perspiciatis sed mollitia cupiditate cumque laboriosam dolore
                deserunt similique natus dicta debitis ducimus? Cum quidem animi
                voluptate ex doloremque vitae vero nobis aspernatur. Voluptates
                similique error provident saepe possimus deserunt alias vitae
                modi itaque, nam accusamus dolore tenetur, repudiandae
                praesentium quisquam, repellendus inventore animi eveniet?
                Accusamus dolores eligendi quis, neque pariatur reprehenderit
                laudantium. Commodi cumque tempore dolor modi fuga omnis sit.
                Reprehenderit vitae autem, ipsa eligendi, accusantium, a quos
                inventore praesentium quaerat odit similique hic soluta mollitia
                placeat suscipit vero ratione quibusdam ad! Doloremque
                laboriosam voluptate molestiae odit quo, repellat excepturi
                iusto ea rem ad tenetur! Dolorem ipsa sunt pariatur commodi
                nobis voluptatibus? Magni quae alias asperiores obcaecati quis
                illum ea, harum enim? Quibusdam voluptates necessitatibus iusto
                beatae omnis nulla rerum tenetur illo eveniet molestias eos
                corrupti natus, ullam fugiat delectus commodi ratione assumenda
                similique inventore iure vel, laboriosam non, maiores labore.
                Tempore. Delectus beatae officiis incidunt neque cupiditate
                deleniti placeat quam enim adipisci, praesentium veritatis
                laboriosam repudiandae aperiam ipsum, magni doloribus itaque?
                Impedit eaque blanditiis aperiam iure non sunt at nihil dolor!
                Porro saepe quibusdam doloremque nemo nam consequuntur placeat
                error. Cupiditate saepe magnam sunt eveniet quia laudantium,
                possimus iusto ullam corporis id quasi deserunt quisquam
                repellat, adipisci neque delectus minima est? Ducimus labore
                consequatur quae rem earum pariatur cum! Optio molestiae nemo
                temporibus totam dolorem maxime natus aliquid deleniti, nisi
                esse suscipit eligendi exercitationem, illum fugiat sunt,
                repellat accusantium itaque quis. Minus impedit repellat
                voluptates sunt vero laboriosam veritatis officia harum neque
                fugit praesentium ipsam hic quas repudiandae minima tenetur
                cupiditate, quae laborum inventore commodi earum quibusdam esse
                recusandae unde. Cum! Ducimus quaerat odio quisquam vero
                similique! Vero magni tempore sed ut, veritatis nisi eius
                officia harum libero soluta sapiente quia magnam dolores
                deserunt quasi voluptatum id assumenda sequi praesentium sunt!
                Adipisci beatae a perspiciatis expedita. Dolor, illum dolorem
                itaque eligendi nulla harum dolores, doloribus consectetur
                corporis rem, iste vel cum. Nemo quos sit qui animi ea
                consectetur iste voluptate corrupti. Impedit aliquid laudantium
                ut minus vitae, nam quae odit veniam reprehenderit quam, error
                ab officiis? Rerum eveniet nisi deleniti quae repudiandae odit
                minima, obcaecati ratione voluptas porro, vel mollitia
                exercitationem. Nemo, itaque optio blanditiis ut unde provident
                ad quos sed nisi? Odio alias dolorum modi iste repellendus
                magnam, earum sapiente eum dolore quia iusto. Dolorum numquam
                labore perspiciatis excepturi rerum. Nostrum dicta dolorem eos
                amet magnam illo, officia ea ratione at iusto enim in alias
                exercitationem accusantium, nisi soluta fuga, nemo quae porro
                perspiciatis eveniet facere maiores? Consectetur, cupiditate
                numquam? Animi enim facere quisquam illum tempore voluptatibus
                autem fugiat iure magnam eius culpa accusamus perferendis
                provident iste, sed aperiam beatae quae doloremque praesentium.
                Mollitia deserunt porro molestias possimus doloribus neque! Qui
                sunt sint voluptatem nobis voluptas, labore architecto
                asperiores earum magnam fugiat delectus alias accusamus facere
                enim laudantium incidunt, quisquam recusandae nemo fugit
                doloribus nam sapiente distinctio ratione odit? Eum. Asperiores
                autem quis optio quasi dignissimos praesentium inventore omnis
                quibusdam rerum. Alias iure fugit, quam cum cumque doloremque at
                explicabo, dolores porro nulla ea magnam laborum illo veritatis
                vitae facilis! Laboriosam illum consequuntur minima a pariatur,
                consectetur dicta aperiam nulla iste cumque debitis ratione
                quaerat, sit, eos corrupti repellat officia vitae eaque ex?
                Consectetur in ipsam vel consequatur deserunt nisi? Similique
                saepe sequi quisquam. Obcaecati accusantium similique possimus.
                Aperiam reiciendis soluta fugit eaque maiores, neque ullam omnis
                cumque harum dicta ab incidunt tempore eligendi repudiandae
                nulla natus! Iusto, quis aut! Nesciunt consequatur corporis
                consequuntur beatae adipisci! Accusantium quos sapiente animi
                autem doloremque illum odio non delectus dolorum corporis
                tempora, magni molestiae deleniti, aliquam voluptatum omnis enim
                tenetur facilis nam sint. Aperiam saepe at ratione provident
                modi quidem, obcaecati, cumque blanditiis quae, temporibus sunt
                dolor quo fuga tenetur. Amet magnam atque odio excepturi ullam
                beatae quae, itaque consequuntur, consectetur ratione tempora.
                Minima sit harum, natus voluptatibus iusto recusandae adipisci
                ducimus omnis maiores. Iure sed neque, sunt cum veritatis
                commodi ex aliquid rem beatae corporis modi similique molestiae
                nihil veniam numquam eligendi? Fugit, quibusdam eius dolor
                officia, repellendus exercitationem explicabo ducimus quam
                obcaecati inventore dolorum fugiat delectus quidem et? Qui,
                soluta voluptas omnis, obcaecati, facilis laborum est fugiat
                magni tempore quo molestias. Sint, ex voluptate? Optio delectus
                natus, facilis impedit, amet voluptatem repudiandae dolor
                expedita obcaecati harum ut. Sapiente est, debitis unde aut,
                alias necessitatibus quis natus id voluptatem nam iste illum?
                Eveniet iste minus laboriosam cum, voluptatibus repudiandae a!
                Odit explicabo expedita similique in non esse minus repudiandae
                deleniti atque, saepe dolores quidem voluptas molestiae
                necessitatibus perspiciatis rerum, officiis unde beatae. Neque
                eligendi beatae autem aspernatur? Molestiae minima accusamus
                itaque reprehenderit velit soluta vero praesentium magni
                doloribus. Consectetur quisquam recusandae ducimus, perspiciatis
                culpa nobis atque expedita dignissimos eum ea, aliquam mollitia.
                Enim ut nemo cumque similique architecto incidunt necessitatibus
                quisquam animi amet quae vel, praesentium placeat sint quo
                pariatur tempora saepe expedita fugit corporis doloremque culpa
                molestiae. Corrupti hic facere magni? Praesentium dolore
                assumenda magnam ducimus pariatur quidem! Id quo hic dolorem
                cumque iure, labore cupiditate architecto iste inventore
                veritatis perferendis quas cum laboriosam sed. Architecto
                ratione repudiandae repellendus qui aperiam. Cum ducimus aliquid
                tempora, accusamus exercitationem facilis, rem illum doloribus
                nulla ab itaque a fugit velit magnam quaerat, reprehenderit
                autem veritatis quia sequi corrupti? Quos rem magnam officia sed
                harum. Mollitia consequatur nulla veritatis nobis quia possimus
                praesentium, eaque asperiores nemo vel, debitis quas vero! Sint
                ea eum consequatur mollitia quae suscipit, maxime beatae
                reprehenderit voluptas adipisci, sit explicabo odit! Nulla
                sapiente saepe voluptatem fugit magni quas iusto. Obcaecati,
                perferendis voluptatibus omnis cum iure voluptatem minus magnam,
                error repudiandae placeat ipsa itaque, asperiores ea autem sequi
                necessitatibus est beatae recusandae. Cum esse corrupti
                blanditiis, iste fugiat quos tempora. Minima esse sequi at aut,
                natus quaerat animi laboriosam qui magnam officia corrupti. A,
                eveniet vel fugiat aliquam iusto quo asperiores officia? Nobis
                doloribus omnis quam deserunt explicabo sapiente ipsam
                perferendis esse. Mollitia laboriosam quaerat, id recusandae
                quidem praesentium enim, ea doloribus necessitatibus accusamus
                earum sapiente delectus itaque quod officia placeat iure?
                Pariatur repudiandae ad ab ea possimus perspiciatis porro eius
                ratione, aperiam atque. Laudantium unde at quibusdam voluptate
                asperiores aliquam quidem magni quasi ex excepturi quas nulla,
                eius est sequi neque? Quasi eum totam, provident eos eligendi
                numquam. Veritatis eius quis eveniet itaque tempore in ducimus,
                deserunt odit, quae autem illo? Illo ea architecto vero odit?
                Numquam ullam rerum nesciunt et! Odit nihil temporibus autem
                totam inventore obcaecati possimus natus, quod, eius neque
                repellat esse consequatur. Ipsam adipisci, velit quo officiis
                tempore voluptatem, accusamus, facilis vel commodi reprehenderit
                dolore nulla nobis? Distinctio illum corrupti ratione vel odit
                similique quibusdam ipsam culpa dolore consectetur. Dolore
                explicabo eaque laudantium eos deserunt dolor quo aliquam
                molestiae. Repellendus natus labore voluptatum beatae velit
                porro aperiam? Numquam modi cumque explicabo fugit corrupti fuga
                voluptatum, aut, deleniti ad illum sapiente adipisci! Omnis
                accusantium velit quae consectetur unde, expedita ratione eius
                totam veniam laborum, error saepe animi mollitia. Ea illo veniam
                iure! Dolorem ipsa a accusantium voluptate ab illum sapiente
                accusamus natus quas quos, molestiae deleniti ducimus commodi
                iure? Quam quod fugiat animi iste cumque assumenda beatae
                reiciendis? Suscipit impedit fugit consequatur magni. Veniam
                corrupti eum molestias aliquid ipsa repellat nemo quidem laborum
                distinctio itaque nam vel deserunt optio sed doloribus illo
                modi, omnis, nobis tempora, unde dolor. Inventore voluptates
                delectus voluptate? Debitis minus odit voluptate, expedita
                dolores iure dolorem odio autem laudantium reprehenderit
                asperiores nisi, sit sapiente laboriosam nam aut. Saepe eligendi
                reiciendis voluptate accusantium dignissimos nemo? Tempora vitae
                velit necessitatibus? Atque doloremque consequuntur saepe quod
                inventore ipsam dolores possimus in quidem aspernatur beatae
                voluptatem, sint eaque officiis delectus commodi! Vero cumque
                ipsa vel, excepturi maiores quasi. Voluptatum, sint numquam eius
                sit asperiores perferendis, deserunt illum natus dolorem
                dignissimos error eaque magnam iure, architecto molestias ullam
                minus molestiae temporibus odio delectus adipisci? Nihil
                doloribus provident corporis consequatur? Ducimus quaerat quos
                facilis sint pariatur. Fugiat sint dolorem deserunt itaque fuga
                aliquam nisi error aspernatur tempora magnam voluptates
                repudiandae, maiores libero quasi asperiores odit! Consectetur
                sequi tenetur optio inventore!
              </p>
              {isExpanded ? (
                <>
                  <p>
                    Nexus is the thrilling account of how we arrived at this
                    moment, and the urgent choices we must now make to survive -
                    and to thrive.
                  </p>
                  <p className="italic">
                    "Harari is one of the most remarkable intellects of our
                    generation - bold, visionary and deeply committed to
                    addressing the greatest challenges of our time."
                  </p>
                  <p>
                    In Nexus, Yuval Noah Harari explores the profound impact of
                    information networks throughout human history. From the
                    earliest forms of communication in prehistoric times to the
                    complex digital landscapes of today, Harari traces how
                    information has shaped societies, economies, and power
                    structures.
                  </p>
                  <p>
                    The book examines how different information
                    technologies—from writing and printing to the internet and
                    artificial intelligence—have revolutionized how humans
                    organize themselves and understand the world. Harari argues
                    that these networks have not only connected us but have
                    fundamentally altered our consciousness and social
                    structures.
                  </p>
                  <p>
                    As we stand at the precipice of an AI revolution, Nexus
                    challenges readers to consider the implications of our
                    technological choices and offers insights into how we might
                    navigate an increasingly networked future.
                  </p>
                </>
              ) : (
                <p>
                  Nexus is the thrilling account of how we arrived at this
                  moment, and the urgent choices we must now make to survive -
                  and to thrive.
                </p>
              )}
            </div>

            <div className="mt-6">
              <Button
                variant="ghost"
                className="text-[#2c5282] p-0 h-auto font-medium flex items-center"
                onClick={toggleReadMore}
              >
                {isExpanded ? (
                  <>
                    Read Less
                    <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Read More
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <h2 className="text-xl font-bold mb-6">Book Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                <Book className="h-6 w-6 text-[#2c5282] mb-2" />
                <h3 className="text-sm text-gray-500 mb-1">Page Count</h3>
                <p className="font-medium">528 Pages</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                <Calendar className="h-6 w-6 text-[#2c5282] mb-2" />
                <h3 className="text-sm text-gray-500 mb-1">Published On</h3>
                <p className="font-medium">May 2023</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                <Hash className="h-6 w-6 text-[#2c5282] mb-2" />
                <h3 className="text-sm text-gray-500 mb-1">ISBN</h3>
                <p className="font-medium">9781911717096</p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center text-center">
                <Globe className="h-6 w-6 text-[#2c5282] mb-2" />
                <h3 className="text-sm text-gray-500 mb-1">Language</h3>
                <p className="font-medium">English</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />
        </div>
      </div>
    </div>
  );
}
