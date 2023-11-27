document.getElementById('convertButton').addEventListener('click', function () {
    const textareaContent = document.getElementById('contrat-textarea').value;
    const blob = new Blob([textareaContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.doc';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
});

const changeContrat = () =>{
    moment.locale('sq');
    const currentDate = moment();
    const nextMonthName = currentDate.add(1, 'months').format('MMMM');
    currentYear = moment().format('YYYY')
let start_work = document.getElementById('start_work').value
let full_name = document.getElementById('full_name').value
let start_work1 = document.getElementById('kt_datepicker_1').value
let end_work = document.getElementById('end_work').value
let comment = document.getElementById('comment').value
let salary = document.getElementById('salary_neto').value
let businessName = document.getElementById('businessName-hidden').value
let address = document.getElementById('address-hidden').value
let arbk = document.getElementById('arbk-hidden').value


const initialDate = moment(start_work1);

// Add 2 weeks (14 days) to the initial date
const trainDay = initialDate.add(2, 'weeks').format('YYYY-MM-DD');

let body =` 
Në bazë të nenit 10 paragrafi 2, pikat 2.1 dhe 2.2, dhe nenit 11 të Ligjit të Punës Nr. 03/L-212  i shpallur në Gazetën Zyrtare të Republikës së Kosovës, më dt. 01.12.2010, Punëdhënësi dhe i Punësuari, si subjekte të marrëdhënies juridike të punës, lidhin:

 KONTRATË PUNE 
PËR 
KOHË TË CAKTUAR / TË PACAKTUAR


Neni 1

Me këtë Kontratë, ${businessName} me seli në (qyteti), ${address}, dhe NUI ${arbk} të cilin e përfaqëson (Emri i Pronarit) (në tekstin e mëtejshëm: Punëdhënësi),  lidhë kontratë pune  me:${full_name} (në  tekstin e mëtejshëm: I punësuari). 

Neni 2

I punësuari do të kryej këto detyra të punës: 

${comment}



Përfaqëson ${businessName} dhe ofertën e kompanisë tek partnerët e jashtëm dhe të brendshëm si dhe tek palët e tjera të interesit


Me shtimin e projekteve, rrjedhimisht punëve ose obligimeve, automatikisht do të rriten edhe të hyrat për të punësuarin


Në rast të ndërprerjës së kësaj kontrate, I punësuari NUK ka të drejtë që për dy vitet e ardhshme të shpalos informata/plane konfidenciale të kompanisë, të punoj në projektet ose me bashkpuntorët e njejtë të ${businessName}.

Neni 3

I punësuari do të kryejë punët në: zyret e ${businessName} si dhe ne teren ose lokacione të ndryshme kur/nëse paraqitet nevoja
Neni 4

I punësuari themelon marrëdhënie pune, në:

1) ${regular1.checked ? 'kohë të caktuar, duke filluar nga:'+ start_work +', deri më: '+end_work: 'kohë të pacaktuar' }.                                                             
                                                                              
Neni 5

I punësuari është i detyruar të fillojë punën, më:${start_work1}  
                                                                                      (dita muaji dhe viti)
Në rast se i punësuari nuk e fillon punën ditën e caktuar sipas kësaj Kontrate të Punës, do të konsiderohet se nuk ka themeluar marrëdhënie pune, përveç nëse është penguar të fillojë punën për shkaqe të arsyeshme.

Neni 6

Puna provuese e të punësuarit zgjat deri më: ${trainDay}. Gjatë periudhës provuese të punës, punëdhënësi dhe i punësuari, mund ta ndërpresin marrëdhënien e punës, me njoftim  paraprak prej shtatë (7) ditësh.  

Neni 7

I punësuari themelon marrëdhënie pune me  orar të plotë. Orari i plotë është: 8 orë pune gjatë ditës, ndërsa 40 orë pune gjatë javës.
                                                                     
Neni 8

Të punësuarit i caktohet paga bazë për punën të cilën e kryen për punëdhënësin, në lartësi prej: ${salary} euro (NETO), së paku një herë në muaj e cila nuk mund të jetë më e ulët se paga minimale.

Neni 9

I punësuari ka të drejtë në pagë shtesë në përqindje të pagës bazë:

 1)  20% në orë për kujdestari;
 2)  30% në orë për punë gjatë natës;
 3)  30% në orë për punë jashtë orarit;
 4)  50% në orë për punë gjatë ditëve të festave, dhe
 5)  50% në orë për punë gjatë fundjavës.



Neni 10

I  punësuari ka të drejtë në  kompensim të pagës pa u angazhuar në punë, në rastet si në vijim:

gjatë ditëve të festave në të cilat nuk punohet;
gjatë kohës së shfrytëzimit të pushimit vjetor;
gjatë aftësimit dhe përsosjes profesionale për të cilën është dërguar dhe
gjatë ushtrimit të funksioneve publike për të cilat nuk paguhet.

Neni 11

I punësuari ka të drejtë në kompensim të pushimit mjekësor të pagës bazë, prej:

1)  100% në rast të shfrytëzimit të pushimit mjekësor të rregullt, mbi bazën deri në 20 ditë pune brenda një (1) viti;  

 2)  70% në rast të shfrytëzimit të pushimin mjekësor si pasojë e lëndimit në punë ose sëmundjes profesionale, e cila ndërlidhet me kryerjen e punëve dhe të shërbimeve për punëdhënësin,  në kohëzgjatje prej dhjetë (10) deri në nëntëdhjetë (90) ditë pune.

Neni 12

I punësuari ka të drejtë në kompensim të shpenzimeve gjatë kohës së kaluar në udhëtim zyrtar jashtë vendit,  në lartësi prej: 500 km.  

Neni 13

I punësuari ka të drejtë në  pushim, dhe atë:

  1) pushim gjatë ditës së punës në kohëzgjatje prej së paku 30 minutash, në përputhje      
      organizimin e orarit të punës së punëdhënësit;

  2) pushim ditor në kohëzgjatje prej së paku dymbëdhjetë (12) orë pandërprerë, midis dy (2)     
  ditëve të njëpasnjëshme të punës;

 3) pushim javor në kohëzgjatje prej njëzetekatër (24) orë pandërprerë;

 4) pushim vjetor në kohëzgjatje së paku 4 javë; 

i punësuari i cili përkundër masave mbrojtëse  nuk mund të mbrohet nga ndikimet e 
     jashtme, ka të drejtë në pushim shtesë vjetor në kohëzgjatje prej tridhjetë ditësh (30) pune    
      për vitin kalendarik;

nëna me fëmijë deri në tri (3) vjeç, prindi vetushqyes dhe personat me aftësi të  kufizuara kanë të drejtë në pushim vjetor shtesë edhe për dy (2) ditë të tjera.
Neni 14   

I punësuari i cili për herë të parë themelon marrëdhënie pune ose i cili nuk ka ndërprerje më tepër se pesë (5) ditë pune, ka të drejtën e shfrytëzimit të pushimit vjetor pas gjashtë (6) muajve të punës së pandërprerë.

Neni 15 

I punësuari ka të drejtë së paku një ditë e gjysmë (1.5) të pushimit, për çdo muaj kalendarik të kaluar në punë, nëse: 

 1) në vitin kalendarik në të cilin për herë të parë ka themeluar marrëdhënie pune, nuk i ka        
     gjashtë (6) muaj  të punës së pandërprerë;

2) në vitin kalendarik nuk e ka fituar të drejtën për shfrytëzimin e pushimit vjetor për shkak të       
    ndërprerjes së marrëdhënies së punës.



Neni 16 

I punësuari është përgjegjës për kompensimin e dëmit për punën ose në lidhje me punën, nëse me qëllim ose nga pakujdesia i ka shkaktuar dëm punëdhënësit. 

I punësuari është përgjegjës edhe për kompensimin e dëmit, nëse me fajin e tij i ka shkaktuar dëm palës së tretë, dëm për të cilin punëdhënësi  e ka kompensuar.

Neni 17

Të punësuarit i ndërprehet marrëdhënia e punës nga punëdhënësi, nëse:

ndërprerja e tillë arsyetohet  për arsye ekonomike, teknike ose organizative;
i punësuari nuk është më i aftë të kryejë detyrat e punës;
në rastet e rënda të sjelljes së keqe të të punësuarit;
për shkak të mospërmbushjes së pakënaqshme të detyrave të punës, dhe 
për rastet e tjera të cilat janë përcaktuar me Ligjin e Punës.  

Neni 18

Punëdhënësi obligohet të sigurojë dhe të zbatojë mjetet dhe masat e mbrojtjes në punë, sipas legjislacionit në fuqi. I punësuari është i detyruar t’iu përmbahet masave të caktuara të mbrojtjes në punë.

Neni 19

Punëdhënësi obligohet t’i paguajë kontributet për skemat pensionale të obligueshme dhe skemat e tjera të përcaktuara me Ligj.

Neni 20

Punëdhënësi dhe i punësuari i pranojnë të gjitha të drejtat, detyrimet dhe përgjegjësitë e caktuara me Ligj, me Kontratë Kolektive dhe me këtë Kontratë.

Neni 21

Për kontestet eventuale të moszbatimit të kësaj Kontrate, palët kontraktuese e pranojnë kompetencën e Gjykatës Komunale në (qyteti).

Neni 22

Secila palë mund ta shkëpusë këtë Kontratë në mënyrë të njëanshme, sipas kushteve dhe rasteve të caktuara me Ligj dhe me Kontratë Kolektive.


Neni 23

Në asnjë rast, dispozitat e kësaj Kontrate nuk mund të jenë më pak të favorshme për të punësuarin dhe punëdhënësit, se dispozitat e Ligjit të Punës ose të Kontratës Kolektive, për sa u përket të drejtave dhe kushteve nga marrëdhënia juridike e punës. Për të drejtat dhe detyrimet të cilat nuk janë përcaktuar me këtë Kontratë, zbatohen drejtpërdrejt dispozitat e Ligjit të Punës dhe të Kontratës Kolektive.

Neni 24

Pas njoftimit me përmbajtjen e Kontratës, kjo Kontratë nga palët kontraktuese u nënshkrua më datën: ${moment().format('D MMMM YYYY')}, në: (qyteti), në: 4 kopje autentike, nga të cilat, secilës palë                                                     i mbeten nga dy kopje.



Punëdhënësi:                                                                                 I Punësuari:
__________________                                                                 _________________         
`
document.getElementById('contrat-textarea').value=body
}

document.getElementById('comment').addEventListener('input',changeContrat)
document.getElementById('salary_neto').addEventListener('input',changeContrat)
document.getElementById('kt_datepicker_1').addEventListener('input',changeContrat)
document.getElementById('full_name').addEventListener('input',changeContrat)
$('#regular1').change(()=>{changeContrat()})