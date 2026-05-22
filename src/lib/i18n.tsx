import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGUAGES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇸🇦", rtl: true },
  { code: "so", name: "Soomaali", flag: "🇸🇴" },
  { code: "am", name: "አማርኛ", flag: "🇪🇹" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "cs", name: "Čeština", flag: "🇨🇿" },
] as const;

export type LangCode = (typeof LANGUAGES)[number]["code"];

type Dict = Record<string, string>;

// Minimal UI dictionary. Long content stays in English to keep this lean; AI
// responses themselves are returned in the user's selected language.
const dictionaries: Record<LangCode, Dict> = {
  en: {
    "nav.home": "Home", "nav.diagnose": "Diagnose", "nav.game": "Learn & Play",
    "nav.pricing": "Pricing", "nav.account": "Account", "nav.signin": "Sign in", "nav.signout": "Sign out",
    "hero.tag": "AI-powered medical companion",
    "hero.title": "Understand your symptoms in seconds.",
    "hero.sub": "Snap a photo of a rash, X-ray, MRI or CT. Get an instant educational explanation in your language. Built for learning — not a replacement for a doctor.",
    "hero.cta": "Start a diagnosis", "hero.cta2": "Play the learning game",
    "feat.title": "Everything you need to stay informed",
    "feat.camera.t": "Camera diagnosis", "feat.camera.d": "Skin, X-ray, MRI, CT and more — analyzed by medical AI.",
    "feat.lang.t": "10+ languages", "feat.lang.d": "English, Arabic, Somali, Amharic, Spanish, French, Chinese, Hindi, Portuguese, Russian.",
    "feat.game.t": "Learn through play", "feat.game.d": "Interactive matching games for medical terms, symptoms, and anatomy.",
    "feat.safe.t": "Private & secure", "feat.safe.d": "Biometric unlock, multi-device sign-in, end-to-end encrypted records.",
    "price.title": "Simple, fair pricing",
    "price.free.t": "Free", "price.free.p": "$0", "price.free.d": "1 trial consult / month · ads supported · full game access",
    "price.one.t": "One-time consult", "price.one.p": "$10", "price.one.d": "Single deep diagnosis · no subscription · keep your history",
    "price.month.t": "Monthly", "price.month.p": "$15/mo", "price.month.d": "5 consults / month · ad-free · priority models",
    "price.cta": "Get started", "price.popular": "Most popular",
    "disclaimer": "AZDoctor provides educational information only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.",
    "footer.rights": "All rights reserved.",
    "diag.title": "New consultation", "diag.type": "What are you uploading?",
    "diag.symptoms": "Describe what's happening (optional)",
    "diag.upload": "Add image (camera or file)", "diag.submit": "Analyze",
    "diag.thinking": "Analyzing…", "diag.history": "Recent consultations",
    "game.title": "Medical Match", "game.sub": "Match the term to its picture. Build your medical vocabulary.",
    "game.score": "Score", "game.next": "Next round", "game.correct": "Correct!", "game.wrong": "Try again",
    "auth.email": "Email", "auth.password": "Password", "auth.name": "Display name",
    "auth.signin": "Sign in", "auth.signup": "Create account", "auth.google": "Continue with Google",
    "auth.have": "Already have an account?", "auth.need": "Need an account?",
    "ad.label": "Sponsored", "ad.upgrade": "Remove ads — upgrade to Monthly",
  },
  ar: {
    "nav.home": "الرئيسية", "nav.diagnose": "التشخيص", "nav.game": "تعلّم والعب",
    "nav.pricing": "الأسعار", "nav.account": "الحساب", "nav.signin": "تسجيل الدخول", "nav.signout": "خروج",
    "hero.tag": "رفيقك الطبي بالذكاء الاصطناعي",
    "hero.title": "افهم أعراضك في ثوانٍ.",
    "hero.sub": "صوّر طفحًا جلديًا أو أشعة سينية أو رنينًا مغناطيسيًا. احصل على شرح تعليمي فوري بلغتك. للتعلم فقط — ليس بديلاً عن الطبيب.",
    "hero.cta": "ابدأ التشخيص", "hero.cta2": "العب لعبة التعلم",
    "feat.title": "كل ما تحتاجه لتبقى مطّلعًا",
    "feat.camera.t": "تشخيص بالكاميرا", "feat.camera.d": "جلد، أشعة، رنين، مقطعية — يحلّلها الذكاء الاصطناعي الطبي.",
    "feat.lang.t": "أكثر من 10 لغات", "feat.lang.d": "الإنجليزية والعربية والصومالية والأمهرية وغيرها.",
    "feat.game.t": "تعلم باللعب", "feat.game.d": "ألعاب مطابقة تفاعلية للمصطلحات والأعراض والتشريح.",
    "feat.safe.t": "خاص وآمن", "feat.safe.d": "فتح بصمي، أجهزة متعددة، تشفير من طرف إلى طرف.",
    "price.title": "أسعار بسيطة وعادلة",
    "price.free.t": "مجاني", "price.free.p": "0$", "price.free.d": "استشارة تجريبية شهريًا · مع إعلانات",
    "price.one.t": "استشارة لمرة واحدة", "price.one.p": "10$", "price.one.d": "تشخيص واحد عميق",
    "price.month.t": "شهري", "price.month.p": "15$/شهر", "price.month.d": "5 استشارات شهريًا · بدون إعلانات",
    "price.cta": "ابدأ الآن", "price.popular": "الأكثر شيوعًا",
    "disclaimer": "يقدّم AZDoctor معلومات تعليمية فقط وليس بديلاً عن المشورة الطبية المهنية.",
    "footer.rights": "جميع الحقوق محفوظة.",
    "diag.title": "استشارة جديدة", "diag.type": "ما الذي تحمّله؟",
    "diag.symptoms": "صف ما يحدث (اختياري)",
    "diag.upload": "أضف صورة", "diag.submit": "حلّل",
    "diag.thinking": "جاري التحليل…", "diag.history": "آخر الاستشارات",
    "game.title": "مطابقة طبية", "game.sub": "طابق المصطلح مع الصورة.",
    "game.score": "النتيجة", "game.next": "الجولة التالية", "game.correct": "صحيح!", "game.wrong": "حاول مجددًا",
    "auth.email": "البريد", "auth.password": "كلمة المرور", "auth.name": "الاسم",
    "auth.signin": "دخول", "auth.signup": "إنشاء حساب", "auth.google": "المتابعة بـ Google",
    "auth.have": "لديك حساب؟", "auth.need": "تحتاج حسابًا؟",
    "ad.label": "إعلان", "ad.upgrade": "أزل الإعلانات — اشترك شهريًا",
  },
  so: {
    "nav.home": "Bogga hore", "nav.diagnose": "Baaritaan", "nav.game": "Baro & Ciyaar",
    "nav.pricing": "Qiimaha", "nav.account": "Akoonka", "nav.signin": "Gal", "nav.signout": "Bax",
    "hero.tag": "Saaxiibkaaga caafimaadka ee AI",
    "hero.title": "Fahan calaamadahaaga ilbiriqsiyo gudahood.",
    "hero.sub": "Sawir maqaarka, raajada, MRI ama CT. Hel sharraxaad waxbarasho oo degdeg ah luqaddaada.",
    "hero.cta": "Bilow baaritaan", "hero.cta2": "Ciyaar ciyaarta",
    "feat.title": "Wax kasta oo aad u baahantahay",
    "feat.camera.t": "Baaritaan kamarad", "feat.camera.d": "Maqaar, raaj, MRI, CT — AI caafimaad ayaa baadha.",
    "feat.lang.t": "10+ luqood", "feat.lang.d": "Soomaali, Carabi, Ingiriis, Amxaari, iyo qaar kale.",
    "feat.game.t": "Baro adigoo ciyaaraya", "feat.game.d": "Ciyaaro is-waafajin oo erayada caafimaadka.",
    "feat.safe.t": "Sir & ammaan", "feat.safe.d": "Furitaan biometric, qalab badan, sir dhammaystiran.",
    "price.title": "Qiimo cad oo cadaalad ah",
    "price.free.t": "Bilaash", "price.free.p": "$0", "price.free.d": "1 baaritaan tijaabo bishii",
    "price.one.t": "Mar keliya", "price.one.p": "$10", "price.one.d": "Hal baaritaan qoto dheer",
    "price.month.t": "Bil walba", "price.month.p": "$15/bil", "price.month.d": "5 baaritaan bishii · xayaysiis la'aan",
    "price.cta": "Bilow", "price.popular": "Caan",
    "disclaimer": "AZDoctor waxay bixisaa macluumaad waxbarasho oo keliya, ma aha beddel u dhaqtarka.",
    "footer.rights": "Xuquuqda oo dhan way xifdisan tahay.",
    "diag.title": "Baaritaan cusub", "diag.type": "Maxaad soo dejinaysaa?",
    "diag.symptoms": "Sharax waxa dhacaya",
    "diag.upload": "Ku dar sawir", "diag.submit": "Falanqee",
    "diag.thinking": "Waan falanqaynayaa…", "diag.history": "Baaritaano dhawaan",
    "game.title": "Is-waafajin Caafimaad", "game.sub": "Is-waafajin erayga iyo sawirka.",
    "game.score": "Dhibco", "game.next": "Wareegga xiga", "game.correct": "Sax!", "game.wrong": "Mar kale",
    "auth.email": "Iimaylka", "auth.password": "Furaha", "auth.name": "Magaca",
    "auth.signin": "Gal", "auth.signup": "Akoon abuur", "auth.google": "Sii wad Google",
    "auth.have": "Akoon ma leedahay?", "auth.need": "Akoon ma u baahan tahay?",
    "ad.label": "Xayaysiis", "ad.upgrade": "Saar xayaysiisyada",
  },
  am: {
    "nav.home": "መነሻ", "nav.diagnose": "ምርመራ", "nav.game": "ተማር እና ተጫወት",
    "nav.pricing": "ዋጋ", "nav.account": "መለያ", "nav.signin": "ግባ", "nav.signout": "ውጣ",
    "hero.tag": "በAI የተደገፈ የጤና ጓደኛ",
    "hero.title": "ምልክቶችህን በሰከንዶች ተረዳ።",
    "hero.sub": "የቆዳ ምስል፣ ራጅ፣ MRI ወይም CT አስቀምጥ።",
    "hero.cta": "ምርመራ ጀምር", "hero.cta2": "ጨዋታውን ተጫወት",
    "feat.title": "የሚያስፈልግህ ሁሉ",
    "feat.camera.t": "በካሜራ ምርመራ", "feat.camera.d": "ቆዳ፣ ራጅ፣ MRI፣ CT።",
    "feat.lang.t": "10+ ቋንቋዎች", "feat.lang.d": "አማርኛ፣ ሶማልኛ፣ እንግሊዝኛ።",
    "feat.game.t": "በመጫወት ተማር", "feat.game.d": "የሕክምና ቃላት ጨዋታ።",
    "feat.safe.t": "ግላዊ እና ደህንነቱ የተጠበቀ", "feat.safe.d": "ባዮሜትሪክ መክፈቻ።",
    "price.title": "ቀላል ዋጋ",
    "price.free.t": "ነጻ", "price.free.p": "$0", "price.free.d": "1 ሙከራ በወር",
    "price.one.t": "አንድ ጊዜ", "price.one.p": "$10", "price.one.d": "አንድ ጥልቅ ምርመራ",
    "price.month.t": "ወርሃዊ", "price.month.p": "$15/ወር", "price.month.d": "5 ምርመራ በወር",
    "price.cta": "ጀምር", "price.popular": "ታዋቂ",
    "disclaimer": "AZDoctor ትምህርታዊ መረጃ ብቻ ይሰጣል፣ የሐኪም ምትክ አይደለም።",
    "footer.rights": "መብቱ የተጠበቀ።",
    "diag.title": "አዲስ ምርመራ", "diag.type": "ምን እየጫንክ ነው?",
    "diag.symptoms": "የሚሆነውን ግለጽ",
    "diag.upload": "ምስል ጨምር", "diag.submit": "ተንትን",
    "diag.thinking": "በመተንተን ላይ…", "diag.history": "የቅርብ ምርመራዎች",
    "game.title": "የሕክምና ግጥሚያ", "game.sub": "ቃሉን ከምስሉ ጋር አዛምድ።",
    "game.score": "ነጥብ", "game.next": "ቀጣይ", "game.correct": "ትክክል!", "game.wrong": "እንደገና ሞክር",
    "auth.email": "ኢሜል", "auth.password": "የይለፍ ቃል", "auth.name": "ስም",
    "auth.signin": "ግባ", "auth.signup": "መለያ ፍጠር", "auth.google": "በGoogle ቀጥል",
    "auth.have": "መለያ አለህ?", "auth.need": "መለያ ያስፈልግሃል?",
    "ad.label": "ማስታወቂያ", "ad.upgrade": "ማስታወቂያዎችን አስወግድ",
  },
  es: { "nav.home": "Inicio", "nav.diagnose": "Diagnosticar", "nav.game": "Aprender", "nav.pricing": "Precios", "nav.account": "Cuenta", "nav.signin": "Entrar", "nav.signout": "Salir", "hero.tag": "Compañero médico con IA", "hero.title": "Entiende tus síntomas en segundos.", "hero.sub": "Sube una foto de la piel, radiografía, MRI o CT y recibe una explicación educativa.", "hero.cta": "Empezar diagnóstico", "hero.cta2": "Jugar al juego", "feat.title": "Todo lo que necesitas", "feat.camera.t": "Diagnóstico por cámara", "feat.camera.d": "Piel, rayos X, MRI, CT.", "feat.lang.t": "10+ idiomas", "feat.lang.d": "Inglés, árabe, español y más.", "feat.game.t": "Aprende jugando", "feat.game.d": "Juegos de términos médicos.", "feat.safe.t": "Privado y seguro", "feat.safe.d": "Biometría y cifrado.", "price.title": "Precios simples", "price.free.t": "Gratis", "price.free.p": "$0", "price.free.d": "1 consulta/mes", "price.one.t": "Pago único", "price.one.p": "$10", "price.one.d": "Una consulta profunda", "price.month.t": "Mensual", "price.month.p": "$15/mes", "price.month.d": "5 consultas/mes · sin anuncios", "price.cta": "Empezar", "price.popular": "Más popular", "disclaimer": "AZDoctor ofrece información educativa, no sustituye consejo médico profesional.", "footer.rights": "Todos los derechos reservados.", "diag.title": "Nueva consulta", "diag.type": "¿Qué subes?", "diag.symptoms": "Describe lo que ocurre", "diag.upload": "Añadir imagen", "diag.submit": "Analizar", "diag.thinking": "Analizando…", "diag.history": "Consultas recientes", "game.title": "Match Médico", "game.sub": "Empareja término con imagen.", "game.score": "Puntos", "game.next": "Siguiente", "game.correct": "¡Correcto!", "game.wrong": "Inténtalo de nuevo", "auth.email": "Email", "auth.password": "Contraseña", "auth.name": "Nombre", "auth.signin": "Entrar", "auth.signup": "Crear cuenta", "auth.google": "Continuar con Google", "auth.have": "¿Ya tienes cuenta?", "auth.need": "¿Necesitas cuenta?", "ad.label": "Patrocinado", "ad.upgrade": "Quitar anuncios" },
  fr: { "nav.home": "Accueil", "nav.diagnose": "Diagnostic", "nav.game": "Apprendre", "nav.pricing": "Tarifs", "nav.account": "Compte", "nav.signin": "Connexion", "nav.signout": "Déconnexion", "hero.tag": "Compagnon médical IA", "hero.title": "Comprenez vos symptômes en quelques secondes.", "hero.sub": "Téléchargez une photo de peau, radiographie, IRM ou scanner.", "hero.cta": "Commencer", "hero.cta2": "Jouer", "feat.title": "Tout ce qu'il vous faut", "feat.camera.t": "Diagnostic par caméra", "feat.camera.d": "Peau, rayons X, IRM, CT.", "feat.lang.t": "10+ langues", "feat.lang.d": "Français, anglais, arabe et plus.", "feat.game.t": "Apprendre en jouant", "feat.game.d": "Jeux de termes médicaux.", "feat.safe.t": "Privé et sécurisé", "feat.safe.d": "Biométrie et chiffrement.", "price.title": "Tarifs simples", "price.free.t": "Gratuit", "price.free.p": "0$", "price.free.d": "1 consult./mois", "price.one.t": "Paiement unique", "price.one.p": "10$", "price.one.d": "Une consultation", "price.month.t": "Mensuel", "price.month.p": "15$/mois", "price.month.d": "5 consult./mois · sans pub", "price.cta": "Commencer", "price.popular": "Populaire", "disclaimer": "AZDoctor fournit des informations éducatives, ne remplace pas un médecin.", "footer.rights": "Tous droits réservés.", "diag.title": "Nouvelle consultation", "diag.type": "Que téléchargez-vous ?", "diag.symptoms": "Décrivez ce qui se passe", "diag.upload": "Ajouter une image", "diag.submit": "Analyser", "diag.thinking": "Analyse…", "diag.history": "Consultations récentes", "game.title": "Match Médical", "game.sub": "Associez le terme à l'image.", "game.score": "Score", "game.next": "Suivant", "game.correct": "Correct !", "game.wrong": "Réessayez", "auth.email": "Email", "auth.password": "Mot de passe", "auth.name": "Nom", "auth.signin": "Connexion", "auth.signup": "Créer un compte", "auth.google": "Continuer avec Google", "auth.have": "Déjà un compte ?", "auth.need": "Besoin d'un compte ?", "ad.label": "Sponsorisé", "ad.upgrade": "Supprimer la pub" },
  zh: { "nav.home": "首页", "nav.diagnose": "诊断", "nav.game": "学习", "nav.pricing": "价格", "nav.account": "账户", "nav.signin": "登录", "nav.signout": "退出", "hero.tag": "AI医疗助手", "hero.title": "几秒钟了解您的症状。", "hero.sub": "上传皮肤照片、X光、MRI或CT,获得即时教育性解释。", "hero.cta": "开始诊断", "hero.cta2": "玩游戏", "feat.title": "您需要的一切", "feat.camera.t": "相机诊断", "feat.camera.d": "皮肤、X光、MRI、CT。", "feat.lang.t": "10+种语言", "feat.lang.d": "中文、英语、阿拉伯语等。", "feat.game.t": "边玩边学", "feat.game.d": "医学术语游戏。", "feat.safe.t": "私密安全", "feat.safe.d": "生物识别与加密。", "price.title": "简单定价", "price.free.t": "免费", "price.free.p": "$0", "price.free.d": "每月1次试用", "price.one.t": "单次", "price.one.p": "$10", "price.one.d": "一次深度诊断", "price.month.t": "月费", "price.month.p": "$15/月", "price.month.d": "5次/月 · 无广告", "price.cta": "开始", "price.popular": "热门", "disclaimer": "AZDoctor仅提供教育信息,不能代替专业医疗建议。", "footer.rights": "保留所有权利。", "diag.title": "新咨询", "diag.type": "您上传什么?", "diag.symptoms": "描述发生了什么", "diag.upload": "添加图片", "diag.submit": "分析", "diag.thinking": "分析中…", "diag.history": "最近的咨询", "game.title": "医学配对", "game.sub": "将术语与图片匹配。", "game.score": "分数", "game.next": "下一轮", "game.correct": "正确!", "game.wrong": "再试", "auth.email": "邮箱", "auth.password": "密码", "auth.name": "姓名", "auth.signin": "登录", "auth.signup": "注册", "auth.google": "用Google继续", "auth.have": "已有账户?", "auth.need": "需要账户?", "ad.label": "赞助", "ad.upgrade": "移除广告" },
  hi: { "nav.home": "होम", "nav.diagnose": "निदान", "nav.game": "सीखें", "nav.pricing": "मूल्य", "nav.account": "खाता", "nav.signin": "साइन इन", "nav.signout": "साइन आउट", "hero.tag": "AI चिकित्सा साथी", "hero.title": "सेकंडों में लक्षण समझें।", "hero.sub": "त्वचा, एक्स-रे, MRI या CT की फोटो अपलोड करें।", "hero.cta": "निदान शुरू करें", "hero.cta2": "खेल खेलें", "feat.title": "आपको जो चाहिए", "feat.camera.t": "कैमरा निदान", "feat.camera.d": "त्वचा, एक्स-रे, MRI, CT।", "feat.lang.t": "10+ भाषाएँ", "feat.lang.d": "हिन्दी, अंग्रेज़ी, अरबी और अधिक।", "feat.game.t": "खेलकर सीखें", "feat.game.d": "चिकित्सा शब्द खेल।", "feat.safe.t": "निजी और सुरक्षित", "feat.safe.d": "बायोमेट्रिक और एन्क्रिप्शन।", "price.title": "सरल मूल्य", "price.free.t": "मुफ्त", "price.free.p": "$0", "price.free.d": "1 परामर्श/माह", "price.one.t": "एकमुश्त", "price.one.p": "$10", "price.one.d": "एक गहरा निदान", "price.month.t": "मासिक", "price.month.p": "$15/माह", "price.month.d": "5 परामर्श/माह", "price.cta": "शुरू करें", "price.popular": "लोकप्रिय", "disclaimer": "AZDoctor केवल शैक्षिक जानकारी प्रदान करता है।", "footer.rights": "सभी अधिकार सुरक्षित।", "diag.title": "नया परामर्श", "diag.type": "क्या अपलोड कर रहे हैं?", "diag.symptoms": "क्या हो रहा है बताएं", "diag.upload": "छवि जोड़ें", "diag.submit": "विश्लेषण", "diag.thinking": "विश्लेषण…", "diag.history": "हाल के परामर्श", "game.title": "मेडिकल मैच", "game.sub": "शब्द को छवि से मिलाएं।", "game.score": "स्कोर", "game.next": "अगला", "game.correct": "सही!", "game.wrong": "फिर कोशिश", "auth.email": "ईमेल", "auth.password": "पासवर्ड", "auth.name": "नाम", "auth.signin": "साइन इन", "auth.signup": "खाता बनाएं", "auth.google": "Google से जारी रखें", "auth.have": "पहले से खाता है?", "auth.need": "खाता चाहिए?", "ad.label": "प्रायोजित", "ad.upgrade": "विज्ञापन हटाएं" },
  pt: { "nav.home": "Início", "nav.diagnose": "Diagnóstico", "nav.game": "Aprender", "nav.pricing": "Preços", "nav.account": "Conta", "nav.signin": "Entrar", "nav.signout": "Sair", "hero.tag": "Companheiro médico com IA", "hero.title": "Entenda seus sintomas em segundos.", "hero.sub": "Envie foto da pele, raio-X, MRI ou CT.", "hero.cta": "Começar diagnóstico", "hero.cta2": "Jogar", "feat.title": "Tudo o que você precisa", "feat.camera.t": "Diagnóstico por câmera", "feat.camera.d": "Pele, raios X, MRI, CT.", "feat.lang.t": "10+ idiomas", "feat.lang.d": "Português, inglês, árabe e mais.", "feat.game.t": "Aprenda jogando", "feat.game.d": "Jogos de termos médicos.", "feat.safe.t": "Privado e seguro", "feat.safe.d": "Biometria e criptografia.", "price.title": "Preços simples", "price.free.t": "Grátis", "price.free.p": "$0", "price.free.d": "1 consulta/mês", "price.one.t": "Pagamento único", "price.one.p": "$10", "price.one.d": "Uma consulta profunda", "price.month.t": "Mensal", "price.month.p": "$15/mês", "price.month.d": "5 consultas/mês · sem anúncios", "price.cta": "Começar", "price.popular": "Popular", "disclaimer": "AZDoctor fornece informações educacionais, não substitui médico.", "footer.rights": "Todos os direitos reservados.", "diag.title": "Nova consulta", "diag.type": "O que está enviando?", "diag.symptoms": "Descreva o que ocorre", "diag.upload": "Adicionar imagem", "diag.submit": "Analisar", "diag.thinking": "Analisando…", "diag.history": "Consultas recentes", "game.title": "Match Médico", "game.sub": "Combine termo com imagem.", "game.score": "Pontos", "game.next": "Próximo", "game.correct": "Correto!", "game.wrong": "Tente novamente", "auth.email": "Email", "auth.password": "Senha", "auth.name": "Nome", "auth.signin": "Entrar", "auth.signup": "Criar conta", "auth.google": "Continuar com Google", "auth.have": "Já tem conta?", "auth.need": "Precisa de conta?", "ad.label": "Patrocinado", "ad.upgrade": "Remover anúncios" },
  ru: { "nav.home": "Главная", "nav.diagnose": "Диагноз", "nav.game": "Учиться", "nav.pricing": "Цены", "nav.account": "Аккаунт", "nav.signin": "Войти", "nav.signout": "Выйти", "hero.tag": "Медицинский помощник с ИИ", "hero.title": "Поймите симптомы за секунды.", "hero.sub": "Загрузите фото кожи, рентген, МРТ или КТ.", "hero.cta": "Начать", "hero.cta2": "Играть", "feat.title": "Всё, что нужно", "feat.camera.t": "Диагноз по камере", "feat.camera.d": "Кожа, рентген, МРТ, КТ.", "feat.lang.t": "10+ языков", "feat.lang.d": "Русский, английский, арабский и др.", "feat.game.t": "Учитесь играя", "feat.game.d": "Игры медицинских терминов.", "feat.safe.t": "Приватно и безопасно", "feat.safe.d": "Биометрия и шифрование.", "price.title": "Простые цены", "price.free.t": "Бесплатно", "price.free.p": "$0", "price.free.d": "1 консультация/мес", "price.one.t": "Разовая", "price.one.p": "$10", "price.one.d": "Одна консультация", "price.month.t": "Ежемесячно", "price.month.p": "$15/мес", "price.month.d": "5 консультаций/мес · без рекламы", "price.cta": "Начать", "price.popular": "Популярно", "disclaimer": "AZDoctor даёт образовательную информацию, не заменяет врача.", "footer.rights": "Все права защищены.", "diag.title": "Новая консультация", "diag.type": "Что загружаете?", "diag.symptoms": "Опишите, что происходит", "diag.upload": "Добавить изображение", "diag.submit": "Анализ", "diag.thinking": "Анализирую…", "diag.history": "Недавние консультации", "game.title": "Медицинский матч", "game.sub": "Сопоставьте термин с картинкой.", "game.score": "Счёт", "game.next": "Далее", "game.correct": "Верно!", "game.wrong": "Попробуйте снова", "auth.email": "Email", "auth.password": "Пароль", "auth.name": "Имя", "auth.signin": "Войти", "auth.signup": "Создать аккаунт", "auth.google": "Продолжить с Google", "auth.have": "Уже есть аккаунт?", "auth.need": "Нужен аккаунт?", "ad.label": "Реклама", "ad.upgrade": "Убрать рекламу" },
  de: { "nav.home": "Startseite", "nav.diagnose": "Diagnose", "nav.game": "Lernen", "nav.pricing": "Preise", "nav.account": "Konto", "nav.signin": "Anmelden", "nav.signout": "Abmelden", "hero.tag": "KI-Medizinbegleiter", "hero.title": "Verstehen Sie Ihre Symptome in Sekunden.", "hero.sub": "Laden Sie ein Foto der Haut, Röntgen, MRT oder CT hoch.", "hero.cta": "Diagnose starten", "hero.cta2": "Spiel spielen", "feat.title": "Alles, was Sie brauchen", "feat.camera.t": "Kameradiagnose", "feat.camera.d": "Haut, Röntgen, MRT, CT.", "feat.lang.t": "12+ Sprachen", "feat.lang.d": "Deutsch, Englisch, Arabisch und mehr.", "feat.game.t": "Spielend lernen", "feat.game.d": "Spiele zu medizinischen Begriffen.", "feat.safe.t": "Privat & sicher", "feat.safe.d": "Biometrie und Verschlüsselung.", "price.title": "Einfache Preise", "price.free.t": "Kostenlos", "price.free.p": "$0", "price.free.d": "—", "price.one.t": "Einmalzahlung", "price.one.p": "$10", "price.one.d": "Eine ausführliche Diagnose", "price.month.t": "Monatlich", "price.month.p": "$15/Monat", "price.month.d": "5 Beratungen/Monat · werbefrei", "price.cta": "Starten", "price.popular": "Beliebt", "disclaimer": "AZDoctor bietet nur Bildungsinformationen und ersetzt keinen Arzt.", "footer.rights": "Alle Rechte vorbehalten.", "diag.title": "Neue Beratung", "diag.type": "Was laden Sie hoch?", "diag.symptoms": "Beschreiben Sie, was passiert", "diag.upload": "Bild hinzufügen", "diag.submit": "Analysieren", "diag.thinking": "Analysiere…", "diag.history": "Letzte Beratungen", "game.title": "Medizinisches Match", "game.sub": "Begriff mit Bild verbinden.", "game.score": "Punkte", "game.next": "Weiter", "game.correct": "Richtig!", "game.wrong": "Erneut versuchen", "auth.email": "E-Mail", "auth.password": "Passwort", "auth.name": "Name", "auth.signin": "Anmelden", "auth.signup": "Konto erstellen", "auth.google": "Mit Google fortfahren", "auth.have": "Schon ein Konto?", "auth.need": "Konto benötigt?", "ad.label": "Gesponsert", "ad.upgrade": "Werbung entfernen" },
  cs: { "nav.home": "Domů", "nav.diagnose": "Diagnóza", "nav.game": "Učit se", "nav.pricing": "Ceny", "nav.account": "Účet", "nav.signin": "Přihlásit", "nav.signout": "Odhlásit", "hero.tag": "Lékařský pomocník s AI", "hero.title": "Pochopte své příznaky během sekund.", "hero.sub": "Nahrajte foto kůže, rentgen, MRI nebo CT.", "hero.cta": "Začít diagnózu", "hero.cta2": "Hrát hru", "feat.title": "Vše, co potřebujete", "feat.camera.t": "Diagnóza kamerou", "feat.camera.d": "Kůže, rentgen, MRI, CT.", "feat.lang.t": "12+ jazyků", "feat.lang.d": "Čeština, angličtina, arabština a další.", "feat.game.t": "Učte se hrou", "feat.game.d": "Hry s lékařskými pojmy.", "feat.safe.t": "Soukromé a bezpečné", "feat.safe.d": "Biometrie a šifrování.", "price.title": "Jednoduché ceny", "price.free.t": "Zdarma", "price.free.p": "$0", "price.free.d": "—", "price.one.t": "Jednorázově", "price.one.p": "$10", "price.one.d": "Jedna podrobná diagnóza", "price.month.t": "Měsíčně", "price.month.p": "$15/měs", "price.month.d": "5 konzultací/měs · bez reklam", "price.cta": "Začít", "price.popular": "Populární", "disclaimer": "AZDoctor poskytuje pouze vzdělávací informace, nenahrazuje lékaře.", "footer.rights": "Všechna práva vyhrazena.", "diag.title": "Nová konzultace", "diag.type": "Co nahráváte?", "diag.symptoms": "Popište, co se děje", "diag.upload": "Přidat obrázek", "diag.submit": "Analyzovat", "diag.thinking": "Analyzuji…", "diag.history": "Nedávné konzultace", "game.title": "Medicínská shoda", "game.sub": "Spojte pojem s obrázkem.", "game.score": "Skóre", "game.next": "Další", "game.correct": "Správně!", "game.wrong": "Zkuste znovu", "auth.email": "E-mail", "auth.password": "Heslo", "auth.name": "Jméno", "auth.signin": "Přihlásit", "auth.signup": "Vytvořit účet", "auth.google": "Pokračovat s Google", "auth.have": "Máte už účet?", "auth.need": "Potřebujete účet?", "ad.label": "Sponzorováno", "ad.upgrade": "Odstranit reklamy" },
};

type Ctx = {
  lang: LangCode;
  setLang: (l: LangCode) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("en");

  useEffect(() => {
    const stored = typeof window !== "undefined" ? (localStorage.getItem("lang") as LangCode | null) : null;
    if (stored && stored in dictionaries) setLangState(stored);
  }, []);

  const setLang = (l: LangCode) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("lang", l);
  };

  const isRtl = (LANGUAGES.find((l) => l.code === lang) as { rtl?: boolean } | undefined)?.rtl ?? false;
  const dir: "ltr" | "rtl" = isRtl ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang, dir]);

  const t = (key: string) => dictionaries[lang]?.[key] ?? dictionaries.en[key] ?? key;

  return <I18nContext.Provider value={{ lang, setLang, t, dir }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n outside provider");
  return ctx;
}
