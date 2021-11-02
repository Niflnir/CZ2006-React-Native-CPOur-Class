import * as SQLite from "expo-sqlite";
db = SQLite.openDatabase("cpour.db");
/**
 * Manages pgs table in local database to store information of all petrol station in Singapore
 */
export default class PgsTable {
  /**
   * Creates new pgs table if not aready existing
   */
  createPgsTable() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS pgs (" +
          "name character varying," +
          "address character varying," +
          "postal character varying," +
          "latLong character varying)",
        [],
        (tx, results) => console.log("created pgs table"),
        (tx, err) => console.log("pgs err: ", err)
      );

      tx.executeSql(
        "SELECT COUNT(*) FROM (SELECT 0 FROM pgs LIMIT 1)",
        [],
        (tx, results) => {
          if (results.rows.item(0)["COUNT(*)"] == 0) {
            this.populate();
          }
        }
      );
    });
  }
  drop() {
    db.transaction((tx) => {
      tx.executeSql(
        "DROP TABLE pgs",
        [],
        () => console.log("dropped"),
        (tx, err) => console.log("drop pgs: ", err)
      );
    });
  }
  print() {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM pgs",
        [],
        (tx, results) => console.log(results),
        (tx, err) => console.log("print pgs: ", err)
      );
    });
  }

  /**
   * Populates pgs table with carpark data
   */
  populate() {
    console.log("populating");
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO WINSTEDT", "141 BUKIT TIMAH ROAD SINGAPORE 229841", "229841", "1.31093436675036,103.842758072049")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO NEWTON", "30 DUNEARN ROAD SINGAPORE 309425", "309425", "1.31626142386247,103.836939567923")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO LAVENDER", "216 LAVENDER STREET SINGAPORE 338777", "338777", "1.31337269054333,103.861173086447")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO TOA PAYOH LORONG 2", "399 TOA PAYOH LORONG 2 SINGAPORE 319640", "319640", "1.33627721077055,103.84652087842")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO JERVOIS","1 JERVOIS ROAD SINGAPORE 248992", "248992","1.29264112902211,103.825616886066")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO MACPHERSON","110 & 114 MACPHERSON ROAD SINGAPORE 348501","348501","1.32873401100799,103.872220370971")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO TANGLIN","353 TANGLIN ROAD SINGAPORE 247959","247959","1.2947933010937,103.81638766634")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO WINDSOR","353 UPPER THOMSON ROAD SINGAPORE 574410","574410","1.35796716105204,103.828390025712")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO UPPER ALJUNIED","373 UPPER ALJUNIED ROAD SINGAPORE 367859","367859","1.33223527844951,103.879051157475")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO ALJUNIED B","611 ALJUNIED ROAD SINGAPORE 389830","389830","1.32433597332171,103.880715967756")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO BUKIT TIMAH","751 BUKIT TIMAH ROAD SINGAPORE 269757","269757","1.3300230215517,103.799054384985")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO ANG MO KIO AVE 8","2225 ANG MO KIO AVENUE 8 SINGAPORE 569810","569810","1.36257285737839,103.852539960282")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO LOWER PIERCE","553 UPPER THOMSON ROAD SINGAPORE 574416","574416","1.37048591873789,103.828172843262")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO DUNEARN","650 DUNEARN ROAD SINGAPORE 574416","574416","1.33106380962877,103.798712381925")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO MOUNTBATTEN","708 MOUNTBATTEN ROAD  SINGAPORE 437733","437733","1.3025613423421,103.884276248332")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO UPPER THOMSON","594 UPPER THOMSON ROAD SINGAPORE 149061","149061","1.37305526504889,103.828947502264")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO QUEENSWAY A","622 QUEENSWAY SINGAPORE 149067","149067","1.30695019942492,103.802462265599")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO GUILLEMARD","225 GUILLEMARD ROAD SINGAPORE 688786","688786","1.31108036207876,103.883636844169")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO ANG MO KIO AVE 3","3551 ANG MO KIO AVE 3 SINGAPORE 569927","569927","1.3708154676615,103.864050606108")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO LORONG CHUAN","384 LORONG CHUAN SINGAPORE 556810","556810","1.36248001438204,103.868157296049")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO GEYLANG LOR 38","638 GEYLANG ROAD SINGAPORE 098837","098837","1.31422886617289,103.889105555372")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO JALAN BUKIT MERAH","2991 JALAN BUKIT MERAH SINGAPORE 159458","159458","1.28259804485136,103.821441444977")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO TANJONG KATONG B","189 TANJONG KATONG ROAD SINGAPORE 436991","436991","1.31128678062405,103.894436406046")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO UPPER SERANGOON","1027 UPPER SERANGOON ROAD SINGAPORE 534765","534765","1.36320780681879,103.887975679942")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO YIO CHU KANG A","160 YIO CHU KANG ROAD SINGAPORE 545614","545614","1.36100845388431,103.87391992528")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO KOVAN","866 UPPER SERANGOON ROAD SINGAPORE 534694","534694","1.35879969213688,103.884058439841")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO QUEENSWAY B","262 QUEENSWAY SINGAPORE 149061","149061","1.29125205568179,103.801092969151")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO HOLLAND","174 HOLLAND ROAD SINGAPORE 278582","278582","1.31250881313514,103.796171570295")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO JURONG KECHIL","37 JALAN JURONG KECHIL SINGAPORE 598577","598577","1.33993485715372,103.774745224001")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO UPPER BUKIT TIMAH A","213 UPPER BUKIT TIMAH ROAD SINGAPORE 588183","588183","1.34517702414227,103.773389778832")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO EAST COAST","239 & 255 EAST COAST ROAD, SINGAPORE 428932","428932","1.30813201157198,103.907772304805")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO YARWOOD","870 DUNEARN ROAD SINGAPORE 589471","589471","1.33624062033008,103.784052362459")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO YIO CHU KANG B","299 YIO CHU KANG ROAD SINGAPORE 805909","805909","1.38170331538119,103.876511106695")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO TELOK BLANGAH","396 TELOK BLANGAH ROAD SINGAPORE 098837","098837","1.26938333346026,103.814346077779")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO CHANGI","649 CHANGI ROAD SINGAPORE 419946","419946","1.32050255282744,103.916073376035")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO FRANKEL","590 EAST COAST ROAD SINGAPORE 458995","458995","1.31102483053201,103.920378020705")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO UPPER EAST COAST","251 UPPER EAST COAST ROAD SINGAPORE 466404","466404","1.31452985974159,103.934305854401")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO BUKIT PANJANG","926 UPPER BT TIMAH ROAD SINGAPORE 507661","507661","1.37695815673439,103.762572545694")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO BEDOK NORTH","99 BEDOK NORTH ROAD SINGAPORE 469677","469677","1.32826265808253,103.939622272349")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO BEDOK SOUTH","799 BEDOK SOUTH AVE 1 SINGAPORE 469335","469335","1.32229200544004,103.932480579897")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO CHOA CHU KANG WAY","31 CHOA CHU KANG WAY SINGAPORE 688786","688786","1.37759071544747,103.75021031988")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO SENGKANG","211 PUNGGOL ROAD SINGAPORE 546673","546673","1.38515804733142,103.900520468615")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO PASIR PANJANG","242A PASIR PANJANG ROAD SINGAPORE 118598","118598","1.28014695291122,103.78552999506")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO SENGKANG WESTWAY","150 SENGKANG WEST WAY SINGAPORE 797622","797622","1.39528165113546,103.880305049942")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO JALAN BUROH","253 JALAN BUROH SINGAPORE 128828","128828","1.30969711617258,103.754834106309")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO WEST COAST","181 WEST COAST ROAD SINGAPORE 127375","127375","1.30812643020778,103.761111327647")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO M-D PETROLEUM","50 CHOA CHU KANG DRIVE SINGAPORE 689716","689716","1.39529413805327,103.747316846257")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO JURONG EAST","150 JURONG EAST AVENUE 1 SINGAPORE 609787","609787","1.34522197636815,103.732766747768")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO YISHUN","10 YISHUN AVENUE 9 SINGAPORE 768888","768888","1.43163452931638,103.83986734931")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO UPPER CHANGI NORTH B","955 UPPER CHANGI ROAD NORTH SINGAPORE 507662","507662","1.35981446751057,103.969700566122")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO TAMPINES AVE 7","9 TAMPINES AVENUE 7 SINGAPORE 529619","529619","1.3575570916133,103.959006565688")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO PASIR RIS","61 PASIR RIS DRIVE 1 SINGAPORE 519525","519525","1.37490843711824,103.940566200869")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO BUKIT BATOK","813 BUKIT BATOK WEST AVE 5 SINGAPORE 127375","127375","1.36669080664893,103.750547929865")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO CHOA CHU KANG AVE 3","50 CHOA CHU KANG AVE 3 SINGAPORE 689858","689858","1.37816692983856,103.737936504206")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO SEMBAWANG A","593 SEMBAWANG ROAD SINGAPORE 758452","758452","1.44019883406037,103.824549249224")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO WOODLANDS AVE 1","50 WOODLANDS AVENUE 1 SINGAPORE 739066","739066","1.43097003446442,103.78451978162")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO SEMBAWANG B","590 SEMBAWANG SINGAPORE 758450","758450","1.44043314468614,103.825090080646")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO JURONG WEST","10 JURONG WEST AVE 1 SINGAPORE 649517","649517","1.35103948153134,103.723669186664")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO JALAN AHMAD IBRAHIM","302 JALAN AHMAD IBRAHIM SINGAPORE 619594","619594","1.32513419600352,103.724455695065")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO TAMPINES AVE 9","40 TAMPINES AVENUE 9 SINGAPORE 529568","529568","1.36057565431408,103.947725887411")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("ESSO PIONEER","19 PIONEER ROAD SINGAPORE 628499","628499","1.31333702966201,103.688291788335")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Bukit Timah","331 Bukit Timah Road, Singapore 259717","259717","1.31807211024323,103.832052636517")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Commonwealth","490 Commonwealth Ave, Singapore 149736","149736","1.30571897940287,103.795158245698")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Dunearn","260 Dunearn Road, Singapore 299542","299542","1.32315111830782,103.819334937881")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Jalan Buroh","33 Jalan Buroh, Singapore 619487","619487","1.31479672339923,103.71490670103")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Jurong East","91 Jurong East Ave 1, Singapore 609786","609786","1.34230022696068,103.737344532222")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Pasir Panjang","158 Pasir Panjang Road, Singapore 118555","118555","1.27711039653088,103.790732312384")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Admiralty","250 Admiralty Road, Singapore 739981","739981","1.44246995810133,103.776276631248")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Ang Mo Kio Ave 1 ( 1 )","793 Ang Mo Kio Ave 1, Singapore 569975","569975","1.3643623904789,103.846004854819")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Balestier","462 Balestier Road, Singapore 329837","329837","1.32668265605579,103.848031790915")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Bedok","101 Bedok North Road, Singapore 469678","469678","1.3278926468409,103.939722618213")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Bukit Merah","3800 Jalan Bt Merah, Singapore 159464","159464","1.28421226638397,103.818686185193")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Bukit Panjang","41 Bukit Panjang Ring Road, Singapore 679945","679945","1.38338304105339,103.772721660415")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Changi","337 Changi Road, Singapore 419810","419810","1.31856987669539,103.908763614437")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Havelock","397 Havelock Road, Singapore 169630","169630","1.28844718787241,103.838023021874")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Hougang","120 Hougang Ave 2, Singapore 538858","538858","1.36868496277618,103.884309433362")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Jalan Leban","1 Jalan Leban, Singapore 577546","577546","1.37194799267847,103.828900852204")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Killiney","132 Killiney Road, Singapore 239562","239562","1.29765059057687,103.838142838816")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Macpherson","429 Macpherson Road, Singapore 368140","368140","1.33191315211867,103.880394974799")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Mountbatten","710 Mountbatten Road, Singapore 437734","437734","1.30212505209284,103.884357330618")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Pasir Ris","11 Pasir Ris Drive 4, Singapore 519456","519456","1.37094019330155,103.960335249151")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Ang Mo Kio Ave 1 ( 2 )","1351 Ang Mo Kio Avenue 1, Singapore 569977","569977","1.3643623904789,103.846004854819")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Ang Mo Kio Ave 5","2761 Ang Mo Kio Avenue 5, Singapore 569866","569866","1.37891427289067,103.83617174857")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Punggol","100 Punggol Central, Singapore 828839","828839","1.40036461088847,103.90912712626")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Queensway","264 Queensway, Singapore 149062","149062","1.29140880291636,103.800927583276")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC River Valley","2 Jervois Road, Singapore 248994","248994","1.29334772968425,103.825973995393")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Sembawang","588 Sembawang Road, Singapore 758448","758448","1.44004572800495,103.825213813661")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Telok Blangah","616 Telok Blangah Road, Singapore 109027","109027","1.2717737825798,103.807090216509")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Thomson","327 Thomson Road, Singapore 307673","307673","1.32476782399871,103.841614677081")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Tanjong Katong","1 Swanage Road/Tanjong Katong, Singapore 437168","437168","1.30828355063205,103.894525442548")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Toa Payoh","180 Toa Payoh Lor 6, Singapore 319381","319381","1.33577569410594,103.855449155002")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Upper East Coast","157 Upper East Coast Road, Singapore 455253","455253","1.31424855903055,103.931099755266")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Upper Serangoon","849 Upper Serangoon Road, Singapore 534686","534686","1.35853939951238,103.882806146004")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Upper Thomson","98 Upper Thomson Road, Singapore 574330","574330","1.34882136396899,103.837848715883")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Yio Chu Kang","76 Yio Chu Kang Road, Singapore 545570","545570","1.35778235472472,103.875384918227")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Yishun","599 Yishun Ring Road, Singapore 768683","768683","1.41737835723208,103.83783530906")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Sengkang","91 Sengkang East Way, Singapore 544885","544885","1.3911673040382,103.898898273701")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SPC Tampines","10 Tampines Avenue 4, Singapore 529679","529679", "1.34866394011079,103.938577027336")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Whitley","236 Whitley Road, 297826","297826","1.32495358641848,103.826932972219")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Balestier","542 Balestiar Road, 329864","329864","1.32676982447462,103.845289086547")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Dunearn","130 Dunearn Road, 309436","309436","1.31883114741118,103.833315010592")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Binjai Park","836 Dunearn Road, 589457","589457", "1.33523458007729,103.786792799014")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Lor Chuan","277 Lor Chuan Road, 556771","556771","1.35783149212489,103.867907440168")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Holland","297 Holland Road, 278629","278629","1.3177262314978,103.785477157866")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Sembawang","62 Sembawang Road, 779089","779089","1.40346687956843,103.818517754048")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Serangoon Avenue","559 Upper Serangoon Road, 534561","534561","1.34737588173712,103.871723547132")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Upper Serangoon","818 Upper Serangoon Road, 534677","534677","1.35572352570845,103.880750271887")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Alexandra","360 Alexandra Road, 159951","159951","1.29031013224517,103.806652820277")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Clementi","126 Clementi Avenue 2, 129930","129930","1.3146783903857,103.768553380224")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Beach Road","4870 Beach Road, 199586","199586","1.3034800429954,103.865583922826")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX MacPherson 465","465 MacPherson Road, 368183","368183","1.33260290838775,103.883660670374")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Jalan Bukit Merah","3781 Jalan Bukit Merah, 159463","159463","1.28441925029097,103.814960183751")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Paya Lebar","128 Paya Lebar Road, 409013","409013","1.32541919500806,103.890835934529")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Chong Pang","3700 Yishun Ring Road, 768690","768690","1.42964488059411,103.829989134202")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Changi","78 Changi Road, 419714","419714","1.31635267644491,103.900132277641")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Tanjong Katong","265 Tanjong Katong Road, 437052","437052","1.30745544937399,103.89563496014")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Jalan Buroh","210 Jalan Buroh, 609831","609831","1.30374213542016,103.742832743433")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX East Coast","355 East Coast Road, 428972","428972","1.3090613714839,103.910806569825")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Jurong Spring","100 Jurong West Ave 1, 649519","649519","1.3497030178588,103.714750976069")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Frankel Avenue","71 Frankel Avenue, 458200","458200","1.31546221265858,103.919075282747")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Tampines","1 Tampines Ave 8, 529594","529594","1.34939512960688,103.928476016676")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Jurong West","21 Jurong West Street 93, 648964","648964","1.33868102526914,103.692767342476")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("CALTEX Jalan Ahmad Ibrahim","400 Jalan Ahmad Ibrahim, 629153","629153","1.32324500047483,103.691912583785")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Bukit Timah Hill","219 Upper Bukit Timah Road 588186","588186","1.34590464082095,103.772087613321")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Dunearn Eng Neo","648, Dunearn Road 289629","289629","1.33096374121426,103.79911013825")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Dunearn University","314 Dunearn Road 299551","299551","1.32336813859503,103.817337523914")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Moulmein","103 Moulmein Road 308080","308080","1.3188931336998,103.84974693471")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Newton Circus","143 Bukit Timah Road 229843","229843","1.31108185953978,103.842239540705")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Newton Hooper Road","150 Bukit Timah Road 229846","229846","1.31134294747229,103.843097934166")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Serangoon Road","509 Serangoon Road 218152","218152","1.3144813137571,103.857185168034")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Thomson Novena","324 Thomson Road 307672","307672","1.32419151051022,103.842166350087")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Ang Mo Kio Avenue 6","3535 Ang Mo Kio Ave 6 569839","569839","1.36775537872269,103.844716816738")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Braddell","110 Braddell Road 359914","359914","1.34458352948807,103.864557902417")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Lake View","80 Upper Thomson Road 574326","574326","1.34802835446493,103.838337837848")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Pierce Reservoir","551 Upper Thomson Road 574415","574415","1.36991930296099,103.827910661751")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Seletar Hills","298 Yio Chu Kang Road 805908","805908","1.38356213349217,103.877066495307")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Sembawang","595 Sembawang Road 758454","758454","1.4405303416093,103.824420690435")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Serangoon Garden","49 Serangoon Garden Way 555944","555944","1.36326260646865,103.867309861394")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Sin Ming","183A Upper Thomson Road 574332","574332","1.35124988188234,103.835408663847")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Toa Payoh","248 Lor 1 Toa Payoh 319755","319755","1.34108964634272,103.848900569646")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Upper Thomson Mandai","1200 Upper Thomson Road 787124","787124","1.39991025627213,103.817849976558")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Woodlands Ave 9","20 Woodlands Ave 9 738954","738954","1.44431165485789,103.790067364842")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Woodlands Mandai","695 Mandai Road 729752","729752","1.41117052943864,103.756454408364")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Yio Chu Kang","158 Yio Chu Kang Road 545612","545612","1.3607867814197,103.873990176496")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Yishun Ave 5","1 Yishun Street 11 768642","768642","1.43080205677888,103.833011168832")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Alexandra","358 Alexandra Road 159950","159950","1.29066996157805,103.806855076045")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Bukit Panjang","772 Upper Bukit Timah Road 678122","678122","1.37227099840533,103.76342332201")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Commonwealth/Stirling Rd","355 Commonwealth Ave 149731","149731","1.29752024517663,103.80333216638")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Havelock","548 Havelock Road 169637","169637","1.28984686860999,103.832414752412")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Outram 305","305 Outram Road 169072","169072","1.28677750729995,103.83452296254")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Queensway Anchorage","260 Queensway 149060","149060","1.28934111083006,103.803024131521")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Telok Blangah","450 Telok Blangah Road 098857","98857","1.27058256798662,103.812843852228")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Tiong Bahru","603 Tiong Bahru Road 158788","158788","1.2883742531214,103.81951732881")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Upper Bukit Timah PIE","35 Upper Bukit Timah Road 588166","588166","1.33863200262166,103.776811690093")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Changi Kembangan","460 Changi Road 419883","419883","1.31881147030036,103.912968727184")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Dunman","743 Dunman Road 439241","439241","1.30979958295022,103.900997946619")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL East Coast","338 East Coast Road 428961","428961","1.30821485693544,103.909909697653")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Geylang Lor 7","203 Geylang Road 389266","389266","1.31198237882226,103.875582544247")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Guillemard","132 Guillemard Road 399720","399720","1.31056412656588,103.883811232417")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Hougang","600 Hougang Ave 3, 538846","538846","1.34925376748035,103.89014412224")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Macpherson","259 Macpherson Road 348584","348584","1.33118255886657,103.877758601196")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Pasir Ris","1 New Loyang Link 506931","506931","1.36576294104606,103.967238516826")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Paya Lebar Macpherson","255 Paya Lebar Road 409037","409037","1.33178786290624,103.888830798484")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Paya Lebar PIE","98 Paya Lebar Road 409008","409008","1.32170762851009,103.891660315436")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Punggol","821 Punggol Road 829169","829169","1.40456503016862,103.906643164633")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Sengkang","61 Sengkang East Road 545015","545015","1.39153102596969,103.892660441487")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Siglap","40 Upper East Coast Road 455212","455212","1.31256586519376,103.926550406504")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Simpang Bedok","331 Bedok Road 469504","469504","1.33086144380998,103.947588153704")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Tampines Ave 2","9 Tampines Ave 2 529731","529731","1.34922876330017,103.947704385806")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Tanjong Katong","191 Tanjong Katong Road 436993","436993","1.31093807363239,103.894475257291")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Boon Lay","2 Boon Lay Avenue 649960","649960","1.34395983553427,103.707788246958")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Bukit Batok Nature Park","28 Bukit Batok East Avenue 6 659760","659760","1.34762672421062,103.764888536147")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Bukit Batok Road","11 Bukit Batok West Avenue 3 659166","659166","1.35022742637166,103.738433107817")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Choa Chu Kang","20 Choa Chu Kang Drive 689717","689717","1.38560552565507,103.746481830809")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Jalan Ahmad Ibrahim","311 Jalan Ahmad Ibrahim 619595","619595","1.32353941367609,103.721771262524")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Jurong West","21 Jurong West Ave 5 649481","649481","1.35008666551118,103.701213561875")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Marsiling","10 Marsiling Road 739109","739109","1.43832533831598,103.775415745085")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Pasir Panjang 168","168 Pasir Panjang Road 118556","118556","1.2774783254497,103.789682515263")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Pasir Panjang 328","328 Pasir Panjang Road 118654","118654","1.28926117294811,103.777844345902")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SHELL Tuas","121 Tuas South Avenue 5 637365","637365","1.28917730065365,103.625562836637")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SINOPEC Bukit Timah","623A Bukit Timah Road 269733","269733","1.32474200223993,103.808544915671")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SINOPEC Woodland","150 Woodlands Avenue 5 739375","739375","1.43269215738796,103.798661573749")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
      tx.executeSql(
        `INSERT INTO pgs (name, address, postal, latLong)` +
          `VALUES ("SINOPEC Yishun","301 Yishun Avenue 1 769141","769141","1.42031322632483,103.848011547162")`,
        [],
        () => {},
        (tx, err) => console.log("pop pgs: ", err)
      );
    });
  }
}
