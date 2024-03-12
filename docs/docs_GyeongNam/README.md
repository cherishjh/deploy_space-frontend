# Back-end 
##  ✅ 회원가입 및 로그인 서비스

## 1. 구현한 기능

- 이메일 회원 가입 및 로그인
- SMTP 이메일 발송
- oauth2 를 이용한 github, google 자동 회원가입 및 로그인
- JWT + Redis 이용한 로그인 상태 관리

<p align="center">
  <img src="/docs/docs_GyeongNam/img/loginFlow.png"/>
</p>

<br/>

---

<br/>

## 2. 기반 기술 설명

<br/>

### 2.1. JWT

- JSON 웹 토큰(JSON Web Token, JWT, "jot”)은 선택적 서명 및 선택적 암호화를 사용하여 데이터를 만들기 위한 인터넷 표준으로, 페이로드는 몇몇 클레임(claim) 표명(assert)을 처리하는 JSON을 보관하고 있다. 토큰은 비공개 시크릿 키 또는 공개/비공개 키를 사용하여 서명된다

<p align="center">
  <img src="/docs/docs_GyeongNam/img/jwt.png"/>
</p>

<br/>

### 2.2. Oauth2

- 플리케이션이 리소스 소유자에게 리소스에 대한 접근 권한을 허용하고, 요청 결과로 전달받은 토큰을 이용해 애플리케이션이 해당 리소스에 접근하는 프로토콜

<br/>

### 2.3. Redis

- 레디스는 Remote Dictionary Server의 약자로서, "키-값" 구조의 비정형 데이터를 저장하고 관리하기 위한 오픈 소스 기반의 비관계형 데이터베이스 관리 시스템으로 인메모리를 사용한다.

<br/>

### 2.4. SMTP

- Simple Mail Transfer Protocol의 약자로, 이메일 전송에 사용되는 네트워크 프로토콜

<br/>

### 2.5. Spring Security

- Spring 기반의 애플리케이션의 보안(인증과 권한, 인가 등)을 담당하는 스프링 하위 프레임워크이다. Spring Security는 '인증'과 '권한'에 대한 부분을 Filter 흐름에 따라 처리하고 있다

<p align="center">
  <img src="/docs/docs_GyeongNam/img/SpringSecurity.png"/>
</p>

---

<br/>

## 3. 이슈

<br/>


### 3.1. Session vs JWT

### 로그인 요청
#### Data Request is High
| 로그인 방식                                         | 보안   | 서버 부하     | 네트워크 부하 | 성능   |
|---------------------------------------------------|--------|-------------|-------------|--------|
| 세션 기반 인증                                      | 높음   | 매우 높음    | 높음         | 중간   |
| 엑세스 토큰만 사용                                   | 중간   | 중간~높음    | 중간         | 우수   |
| 엑세스 토큰과 리프레시 토큰 사용                     | 우수   | 높음         | 중간~높음    | 중간   |
| 엑세스 토큰은 클라이언트에게 주고 리프레시 토큰은 서버에 저장 | 우수   | 중간~높음    | 중간~높음    | 중간   |
| 엑세스 토큰은 클라이언트에게 주고 리프레시 토큰을 로그인한 클라이언트 IP 정보와 함께 서버에 저장 | 최우수 | 중간~높음 | 중간~높음 | 중간   |

#### Data Request is Low
| 로그인 방식                                         | 보안   | 서버 부하     | 네트워크 부하 | 성능   |
|---------------------------------------------------|--------|-------------|-------------|--------|
| 세션 기반 인증                                      | 높음   | 중간~높음    | 높음         | 중간   |
| 엑세스 토큰만 사용                                   | 중간   | 낮음~중간    | 중간         | 우수   |
| 엑세스 토큰과 리프레시 토큰 사용                     | 우수   | 중간         | 중간~높음    | 중간   |
| 엑세스 토큰은 클라이언트에게 주고 리프레시 토큰은 서버에 저장 | 우수   | 낮음~중간    | 중간~높음    | 중간   |
| 엑세스 토큰은 클라이언트에게 주고 리프레시 토큰을 로그인한 클라이언트 IP 정보와 함께 서버에 저장 | 최우수 | 낮음~중간 | 중간~높음 | 중간   |

### 데이터 요청
#### Data Request is High
| 로그인 방식                                         | 보안   | 서버 부하     | 네트워크 부하 | 성능   |
|---------------------------------------------------|--------|-------------|-------------|--------|
| 세션 기반 인증                                      | 높음   | 매우 높음    | 높음         | 중간   |
| 엑세스 토큰만 사용                                   | 중간   | 중간~높음    | 중간         | 우수   |
| 엑세스 토큰과 리프레시 토큰 사용                     | 우수   | 높음         | 중간~높음    | 중간   |
| 엑세스 토큰은 클라이언트에게 주고 리프레시 토큰은 서버에 저장 | 우수   | 중간~높음    | 중간~높음    | 중간   |
| 엑세스 토큰은 클라이언트에게 주고 리프레시 토큰을 로그인한 클라이언트 IP 정보와 함께 서버에 저장 | 최우수 | 중간~높음 | 중간~높음 | 중간   |

#### Data Request is Low
| 로그인 방식                                         | 보안   | 서버 부하     | 네트워크 부하 | 성능   |
|---------------------------------------------------|--------|-------------|-------------|--------|
| 세션 기반 인증                                      | 높음   | 중간~높음    | 높음         | 중간   |
| 엑세스 토큰만 사용                                   | 중간   | 낮음~중간    | 중간         | 우수   |
| 엑세스 토큰과 리프레시 토큰 사용                     | 우수   | 중간         | 중간~높음    | 중간   |
| 엑세스 토큰은 클라이언트에게 주고 리프레시 토큰은 서버에 저장 | 우수   | 낮음~중간    | 중간~높음    | 중간   |
| 엑세스 토큰은 클라이언트에게 주고 리프레시 토큰을 로그인한 클라이언트 IP 정보와 함께 서버에 저장 | 최우수 | 낮음~중간 | 중간~높음 | 중간   |

<br/>

---

## 4. 구현

<br/>

## 4.1. SecurityConfig


```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final LoginService loginService;
    private final LoginSuccessHandler loginSuccessHandler;
    private final LoginFailureHandler loginFailureHandler;
    private final CustomAuthenticationEntryPointHandler customAuthenticationEntryPointHandler;
    private final CustomAccessDeniedHandler customAccessDeniedHandler;



    @Autowired
    public SecurityConfig(
            JwtAuthFilter jwtAuthFilter,
            LoginService loginService,
            LoginSuccessHandler loginSuccessHandler,
            LoginFailureHandler loginFailureHandler,
            CustomAuthenticationEntryPointHandler customAuthenticationEntryPointHandler,
            CustomAccessDeniedHandler customAccessDeniedHandler
    ) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.loginService = loginService;
        this.loginSuccessHandler = loginSuccessHandler;
        this.loginFailureHandler = loginFailureHandler;
        this.customAuthenticationEntryPointHandler = customAuthenticationEntryPointHandler;
        this.customAccessDeniedHandler = customAccessDeniedHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(CorsConfig.corsConfigurationSource()))
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorizeRequest ->
                        authorizeRequest
                                .requestMatchers("/" ).permitAll()
                                .requestMatchers(SwaggerUrl).permitAll()
                                .requestMatchers(MemberApiUrl).permitAll()
                                .requestMatchers(LoginApiUrl).permitAll()
                                .requestMatchers(PostApiUrl).permitAll()
                                .requestMatchers(FileResource).permitAll()
                                .requestMatchers(ManagerApiUrl).hasAnyRole("MANAGER")
                                .anyRequest()
                                .authenticated()

                )

                .sessionManagement((sessionManagement) ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

                .oauth2Login((oauth2) -> oauth2
                        .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint
                                .userService(loginService)
                        )
                        .successHandler(loginSuccessHandler)
                        .failureHandler(loginFailureHandler)
                )

                .exceptionHandling( (exceptionHandling) -> {
                    exceptionHandling.authenticationEntryPoint(customAuthenticationEntryPointHandler);
                    exceptionHandling.accessDeniedHandler(customAccessDeniedHandler);
                })

                .build();
    }

    private static final String[] SwaggerUrl = {
            "/api/vi/auth/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/v3/api-docs/**",
            "/v3/api-docs.yaml"
    };

    private static final String[] MemberApiUrl = {
            "/api/member/login",
            "/api/member/create",
            "/api/member/emailAuthentication",
            "/api/member/emailCheck",
            "/ws/**"
    };

    private static final String[] LoginApiUrl = {

            "/oauth2/**",
            "/login",
    };

    private static final String[] PostApiUrl = {
            "/api/post/list",
            "/PostDetail/**",
    };

    private static final String[] FileResource = {
            "/static/**",
            "/images/**",
            "api/file/images/*/image"
    };

    private static final String[] ManagerApiUrl = {
            "/manager/**",
    };

}

```




## 4.2. LoginService


```java
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);
        MemberInfo info = null;

        // google
        if(userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            info = new GoogleMember(oAuth2User.getAttributes());
        }

        // github
        if(userRequest.getClientRegistration().getRegistrationId().equals("github")){
            info = new GitHubMember(oAuth2User.getAttributes(), userRequest.getAccessToken().getTokenValue());
        }

        // 자동 회원가입
        if(info != null && !memberService.existsByEmail(Objects.requireNonNull(info).getEmail())){
            memberService.memberCreate(
                    MemberReqDto.builder()
                            .name(info.getName().equals("null") ? info.getEmail() : info.getName())
                            .email(info.getEmail())
                            .nickname(info.getName().equals("null") ? info.getEmail() : info.getName())
                            .profile(info.getPicture())
                            .loginType(info.getProvider())
                            .build()
            );
        }
        Member member = memberService.findByEmail(Objects.requireNonNull(info).getEmail());

        // LoginSuccessHandler
        Map<String, Object> attributes = new HashMap<>(oAuth2User.getAttributes());
        attributes.put("role", member.getRole());
        attributes.put("email", member.getEmail());


        return new DefaultOAuth2User(
                oAuth2User.getAuthorities(),
                attributes,
                userRequest.getClientRegistration().getProviderDetails()
                        .getUserInfoEndpoint().getUserNameAttributeName()
        );
    }

    // 로그인
    public Object login(LoginReqDto loginReqDto, LoginType loginType) {
        Member member = memberService.findByEmail(loginReqDto.getEmail());

        // sns 회원가입한 사람이 일반 로그인 하려고 할때
        if(member.getPassword() == null && loginType.equals(LoginType.EMAIL)){
            throw new UsernameNotFoundException(
                    "해당 이메일은 "+ member.getLoginType().toString() + "로 로그인 한 계정입니다. \n" +
                            "만일 이메일로 로그인 하고 싶으시다면 패스워드를 설정해주세요."
            );
        }

        // 패스워드 일치 여부
        if(!passwordConfig.passwordEncoder().matches(loginReqDto.getPassword(), member.getPassword())){
            throw new UsernameNotFoundException("비밀번호가 틀렸습니다.");
        }

        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        return jwtProvider.exportToken(member.getEmail(), member.getRole().toString(), webConfig.ipCheck(request));
    }
```

## 4.3. JwtProvider

```java
@Slf4j
@Component
public class JwtProvider {

    @Value("${jwt.accessTokenSecretKey}")
    String accessTokenSecretKey;

    @Value("${jwt.refreshTokenSecretKey}")
    String refreshTokenSecretKey;

    @Value("${jwt.accessTokenTime}")
    int accessTokenTime;

    @Value("${jwt.refreshTokenTime}")
    int refreshTokenTime;

    @Value("${spring.data.redis.host}")
    private String redisHost;

    private final RedisTemplate<String,String> redisTemplate;

    public JwtProvider(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public String createAccessToken(String email,String role){
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role",role);
        Date now = new Date();

        Key key = Keys.hmacShaKeyFor(accessTokenSecretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + accessTokenTime * 60 * 1000L))
                .signWith( key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String createRefreshToken (String email,String role, String clientIP){
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("role",role);
        claims.put("clientIP", clientIP);
        Date now = new Date();

        Key key = Keys.hmacShaKeyFor(refreshTokenSecretKey.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + refreshTokenTime * 24 * 60 * 60 * 1000L))
                .signWith( key, SignatureAlgorithm.HS512)
                .compact();
    }

    public String extractAccessToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public Claims validateAccessToken(String token) {
        Key key = Keys.hmacShaKeyFor(accessTokenSecretKey.getBytes(StandardCharsets.UTF_8));
        return Jwts.parserBuilder().
                setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public Claims validateRefreshToken(String token) {
        Key key = Keys.hmacShaKeyFor(refreshTokenSecretKey.getBytes(StandardCharsets.UTF_8));
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String exportToken(String email, String role, String clientIP){
        String accessToken = this.createAccessToken(
                email, role
        );

        String refreshToken = this.createRefreshToken(
                email, role, clientIP
        );
        redisTemplate.opsForValue().set(accessToken, refreshToken, refreshTokenTime, TimeUnit.DAYS);


        return accessToken;
    }


    public String reExportToken(String email, String role, String accessToken, String refreshToken){
        String newAccessToken = this.createAccessToken(
                email, role
        );
        Jedis jedis = new Jedis(redisHost, 6379);
        long ttl = jedis.ttl(accessToken);
        redisTemplate.delete(accessToken);
        redisTemplate.opsForValue().set(newAccessToken, refreshToken, ttl, TimeUnit.SECONDS);

        return  newAccessToken;
    }
}

```

## 4.3. LoginSuccessHandler

```java
@Slf4j
@Component
public class LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final ObjectMapper objectMapper;
    private final JwtProvider jwtProvider;
    private final WebConfig webConfig;

    @Autowired
    public LoginSuccessHandler(
            ObjectMapper objectMapper,
            JwtProvider jwtProvider,
            WebConfig webConfig
    ) {
        this.objectMapper = objectMapper;
        this.jwtProvider = jwtProvider;
        this.webConfig = webConfig;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();


        Cookie cookie = new Cookie("accessToken", jwtProvider.exportToken(
                oauth2User.getAttribute("email"),
                Objects.requireNonNull(oauth2User.getAttribute("role")).toString(),
                webConfig.ipCheck(request)));
        cookie.setPath("/"); // 모든 경로에 대해 쿠키 전송
        response.addCookie(cookie);

        String redirectUrl = "http://localhost:8081/oauth2/redirect";

        // 클라이언트로 리다이렉트
        response.setStatus(HttpStatus.FOUND.value());
        response.setHeader(HttpHeaders.LOCATION, redirectUrl);
    }
}

```
## 4.4. JwtAuthFilter

```java
@Slf4j
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

  private final ObjectMapper objectMapper;
  private final JwtProvider jwtProvider;
  private final RedisTemplate<String, String> redisTemplate;
  private final WebConfig webConfig;

  @Autowired
  public JwtAuthFilter(
          ObjectMapper objectMapper,
          JwtProvider jwtProvider,
          RedisTemplate<String, String> redisTemplate,
          WebConfig webConfig
  ) {
    this.objectMapper = objectMapper;
    this.jwtProvider = jwtProvider;
    this.redisTemplate = redisTemplate;
    this.webConfig = webConfig;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    try {
      String token = jwtProvider.extractAccessToken(request);
      if (token != null) {
        Claims claims = jwtProvider.validateAccessToken(token);
        if (claims != null) {
          CustomUserDetails customUserDetails = CustomUserDetails.builder()
                  .role(claims.get("role").toString())
                  .username(claims.getSubject())
                  .password("")
                  .build();

          customUserDetails.getAuthorities().add(new SimpleGrantedAuthority("ROLE_" + claims.get("role")));

          UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                  customUserDetails, null, customUserDetails.getAuthorities()
          );
          SecurityContextHolder.getContext().setAuthentication(authentication);
        }
      }
      filterChain.doFilter(request, response);
    }
    catch (Exception e ){
      String errorMessage = "";
      Object errorException = "";
      if(e instanceof MalformedJwtException){
        errorMessage = "올바르지 않은 토큰입니다.";
        errorException = e.getMessage();
      }
      if(e instanceof ExpiredJwtException){
        errorMessage = "다시 로그인해 주세요.";
        String token =  jwtProvider.extractAccessToken(request);
        String refreshToken = redisTemplate.opsForValue().get(token);
        if(refreshToken != null){
          Claims claims = jwtProvider.validateRefreshToken(refreshToken);
          if(claims.get("clientIP").toString().equals(webConfig.ipCheck(request))){
            errorMessage = "토큰을 재발행 합니다.";
            errorException = jwtProvider.reExportToken(
                    claims.getSubject(),
                    claims.get("role").toString(),
                    token,
                    refreshToken
            );
          }
        }else{
          errorException = "로그인 만료";
        }

      }
      log.error(e.getClass().getName() + " : " + errorMessage);

      response.setContentType(MediaType.APPLICATION_JSON_VALUE);
      response.setCharacterEncoding("UTF-8");
      objectMapper.writeValue(
              response.getWriter(),
              CommonResponse.builder()
                      .httpStatus(HttpStatus.UNAUTHORIZED)
                      .message(errorMessage)
                      .result(errorException)
                      .build()
      );
    }
  }
}
```

<p align="center">
  <img src="/docs/docs_GyeongNam/img/Filter.png"/>
</p>


<br/>


---

# Front-end
##  ✅ 회원가입 및 로그인 서비스

<br/>

---

## 1. 구현한 기능

- axios interceptors
- OAuthRedirect
- authService
- Header
- Sidebar

## 2. 설명

<br/>

## 2.1. axios interceptors

```javascript
import { boot } from 'quasar/wrappers';
import axios from 'axios';
import {FountURL} from "src/services/authService";


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      if(
        error.response.data.message === "다시 로그인해 주세요."
        && error.response.data.result === "로그인 만료"
      ){
        localStorage.removeItem('accessToken');
        location.href=FountURL;
      }
      else if(error.response.data.message === "토큰을 재발행 합니다."){
        localStorage.setItem('accessToken' ,error.response.data.result);
        originalRequest.headers.Authorization = `Bearer ${error.response.data.result}`;
        return axiosInstance(originalRequest);
      }else{
        localStorage.removeItem('accessToken');
        location.href=FountURL;
      }
      originalRequest._retry = true;
      console.log(error);

    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axiosInstance; // Vue 3
  // app.config.globalProperties.$axios = axiosInstance; // Vue 2
});

export {axiosInstance}

````

<br/>

## 2.2. OAuthRedirect

```javascript
<template>
  <div>

  </div>
</template>

<script>
// 전역적인 인증 상태를 나타내는 컴포넌트로, 사용자의 로그인 상태를 확인하고 로그인 상태에 따라 헤더에 로그인/로그아웃 버튼을 표시
import {triggerOngoing} from "src/utils/notification";
import {FountURL} from "src/services/authService";
export default {
  methods: {
    getAccessTokenFromCookie() {
      const cookies = document.cookie.split('; ');
      for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === 'accessToken') {
          return decodeURIComponent(value);
        }
      }
      return null;
    }
  },
  created() {
    // 쿠키에서 accessToken 가져오기
    const accessToken = this.getAccessTokenFromCookie();
    if(accessToken != null){
      localStorage.setItem("accessToken",accessToken)
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    }
    location.href=FountURL;
  }
}
</script>

<style lang="scss" scoped>

</style>

```
<br/>

## 2.3. authService

```javascript
// 사용자 인증 및 권한 부여와 관련된 작업을 처리하는 파일로, 사용자 로그인, 로그아웃, 회원가입 등의 작업을 수행하고 사용자의 인증 상태를 관리
import axios from 'axios';
import { triggerOngoing, triggerNegative } from 'src/utils/notification';
import {axiosInstance} from "boot/axios";

export const FountURL = 'http://localhost:8081';
export const BackURL = 'http://localhost:8080';

export function RegisterApi(formData, $q, router) {
  axios.post(BackURL+'/api/member/create', formData)
    .then(response => {
      triggerOngoing('회원가입 했습니다. 로그인해주세요.', $q);
      router.push('/');
    })
    .catch(error => {
      triggerNegative(error.response.data.message, $q);
    });
}

export function githubApi(){
  location.href=BackURL+'/oauth2/authorization/github';
}
export function googleApi(){
  location.href=BackURL+'/oauth2/authorization/google';
}

export function emailLogin(formData, $q, router){
  axios.post(BackURL+'/api/member/login', formData)
    .then(response => {
      localStorage.setItem('accessToken',response.data.result)
      location.reload();
    })
    .catch(error => {
      triggerNegative(error.response.data.message, $q);
    });
}

export function checkEmail(formData, $q)   {
  axios.post(BackURL+'/api/member/emailAuthentication', formData)
    .then(response => {
      triggerOngoing('해당 메일로 인증번호를 발송했습니다.', $q);
    })
    .catch(error => {
      triggerNegative(error.response.data.message, $q);
    });
}

export function checkCode(formData, $q) {
  return new Promise((resolve, reject) => {
    axios.post(BackURL+'/api/member/emailCheck', formData)
      .then(response => {
        triggerOngoing(response.data.message, $q);
        resolve(true); // 성공 시 true 반환
      })
      .catch(error => {
        triggerNegative(error.response.data.message, $q);
        resolve(false); // 실패 시 false 반환
      });
  });
}

export function Logout($q){
  axiosInstance.get(BackURL+'/api/member/logout')
  .then(response => {
    console.log(response);
    localStorage.removeItem("accessToken");
    location.href=FountURL;
    resolve(true); // 성공 시 true 반환
  })
  .catch(error => {
    console.log(error);
    localStorage.removeItem("accessToken");
    location.href=FountURL;
  });
}

export function test(){
  return new Promise((resolve, reject) => {
  axiosInstance.post(BackURL+'/api/member/qwe',{id:123})
    .then(response => {
    })
    .catch(error => {
    });
  });
}

```
<br/>

## 2.4. Header

```javascript
<style>
.forfont__size {
  font-size: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  height: 45vh;

}
</style>
<template>
  <q-header class="top-navbar row justify-between q-ma-auto">
    <div class="text-white q-mx-lg q-my-auto">
      <q-btn class="home text-center text-orange"  size="2em"  flat label="encore SPACE" @click="this.$router.push('/')"></q-btn>
    </div>
    <div class="text-grey-8 row q-mx-lg q-my-auto text-white">

      <q-input class="search q-my-auto q-mx-lg-xl text-white " standout="bg-orange text-white" dense  rounded  placeholder="Search..."   model-value="" >
        <template v-slot:append>
          <q-icon class="text-white" color="text-white" name="search" />
        </template>
      </q-input>
      <q-icon class="q-mx-lg text-white" size="3em" name="notifications"></q-icon>

      <q-icon class="q-mx-auto text-white" size="3em" name="mail"></q-icon>

      <q-icon class="q-mx-lg text-white" size="2.7em" name="fas fa-calendar"></q-icon>

      <q-btn v-if="!this.isLoggedIn" flat rounded class="bg-white text-black " label="Login" >
        <q-menu class="q-my-lg-lg">
          <LoginPage></LoginPage>
        </q-menu>
      </q-btn>


      <q-btn v-if="this.isLoggedIn" flat rounded class="bg-white text-black " label="Menu" >
        <q-menu>

          <q-list>
            <q-item
              clickable
              @click="this.$router.push('/MyPage')">
              <q-item-section >My Page</q-item-section>
            </q-item>
            <q-item
              clickable
              @click="this.$router.push('/PostEditor')">
              <q-item-section >Posting</q-item-section>
            </q-item>

            <q-item
              clickable
              @click="this.$router.push('/MySpace/MY')">
              <q-item-section>My SPACE</q-item-section>
            </q-item>
            <q-item
              clickable
              @click="this.$router.push('/TeamSpace/TEAM')">
              <q-item-section>Team SPACE</q-item-section>
            </q-item>
            <q-item
              clickable
              @click="this.$router.push('/GroupSpace/GROUP')">
              <q-item-section>Group SPACE</q-item-section>
            </q-item>
            <q-item
              clickable
              @click="this.$router.push('/Messages')">
              <q-item-section>Message</q-item-section>
            </q-item>
            <q-item
              clickable
              @click="handleLogout">
              <q-item-section>Log Out</q-item-section>
            </q-item>

          </q-list>

        </q-menu>
      </q-btn>

    </div>
  </q-header>
</template>

<script>
// 애플리케이션의 상단에 표시되는 헤더 컴포넌트로, 로고나 네비게이션 메뉴와 같은 요소
import {ref} from "vue";
import LoginPage from "pages/main/LoginPage.vue";
import {Logout, test} from "src/services/authService";


export default {
  name: 'AppHeader'
  ,
  components: {LoginPage},

  data() {
    return{
      isLoggedIn:false
    }
  },
  setup () {
    return {
      showing: ref(false),
    }
  },
  created() {
    if(localStorage.getItem("accessToken")){
      this.isLoggedIn = true
    }
  },
  methods: {

    handleLogout(){
      Logout(this.$q)

    }
  }
}
</script>

````

## 2.5. Sidebar

```javascript

<template>
  <q-item-section class="col-2" >
    <div class="text-white text-center " style=" position: fixed; top: 33%;  left: 5%;">
      <p>
        <q-btn class="mr-2"
        @mouseenter="handleHover"
        @mouseleave="handleLeave"
        @click="this.$router.push('/MyPage')"
        > My Page</q-btn>
    </p>
    <p>
      <q-btn class="mr-2"
      @mouseenter="handleHover"
      @mouseleave="handleLeave"
      @click="this.$router.push('/PostEditor')"
      > Posting</q-btn>
  </p>

  <p>
    <q-btn class="mr-2"
    @mouseenter="handleHover"
    @mouseleave="handleLeave"
    @click="this.$router.push('/MySpace/MY')"
    > My SPACE</q-btn>
</p>
<p>
  <q-btn class="mr-2"
  @mouseenter="handleHover"
  @mouseleave="handleLeave"
  @click="this.$router.push('/TeamSpace/TEAM')"
  > Team SPACE</q-btn>
</p>
<p>
  <q-btn class="mr-2"
  @mouseenter="handleHover"
  @mouseleave="handleLeave"
  @click="this.$router.push('/GroupSpace/GROUP')"
  > Group SPACE</q-btn>
</p>
  <p>
    <q-btn class="mr-2"
    @mouseenter="handleHover"
    @mouseleave="handleLeave"
    @click="this.$router.push('/Messages')"
    > Messages</q-btn>
</p>

</div>
</q-item-section>
</template>

<script>
  // 애플리케이션의 사이드바를 정의하는 컴포넌트. 사이드바에는 추가적인 메뉴나 기능을 제공
  export default {
  setup() {


  return {}
}
  ,
  methods: {
  handleHover(event) {
  // 호버 시 버튼 스타일 변경
  event.target.classList.add("hovered");
},
  handleLeave(event) {
  // 호버 해제 시 버튼 스타일 초기화
  event.target.classList.remove("hovered");
}
}
}
</script>

<style lang="scss" scoped>
  .hovered {
  color: orange /* 호버 시 텍스트 색상 변경 */
}
</style>


```
---
