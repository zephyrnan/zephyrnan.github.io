---
title: SpringBoot 完整学习笔记
date: 2025-11-20
categories:
  - 后端开发
tags:
  - Java
  - SpringBoot
---

# SpringBoot 完整学习笔记

> Spring Boot 是由 Pivotal 团队提供的全新框架,旨在简化 Spring 应用的初始搭建和开发过程。本笔记涵盖从基础入门到企业级应用开发的完整内容。

---

## 目录

- [一、SpringBoot 简介](#一springboot-简介)
- [二、环境搭建与快速开始](#二环境搭建与快速开始)
- [三、SpringBoot 核心特性](#三springboot-核心特性)
- [四、Web 开发](#四web-开发)
- [五、数据访问](#五数据访问)
- [六、Navicat Premium 16 使用指南](#六navicat-premium-16-使用指南)
- [七、整合第三方技术](#七整合第三方技术)
- [八、实战项目](#八实战项目)
- [九、部署与运维](#九部署与运维)
- [十、最佳实践](#十最佳实践)

---

## 一、SpringBoot 简介

### 1.1 什么是 SpringBoot

> 💡 **SpringBoot 的核心价值**：
> - SpringBoot 是 Spring 生态圈中的一个全新项目
> - **核心思想**：约定大于配置(Convention Over Configuration)
> - **目标**：简化 Spring 应用开发,让开发者专注于业务逻辑
> - **优势**：
>   - 无需复杂的 XML 配置
>   - 内嵌 Web 服务器(Tomcat、Jetty、Undertow)
>   - 自动配置 Spring 和第三方库
>   - 提供生产级别的监控和健康检查
>   - 开箱即用,快速开发

**Spring vs SpringBoot**

| 特性 | Spring | SpringBoot |
|------|--------|-----------|
| 配置方式 | 大量 XML 配置 | 自动配置 + 注解 |
| 项目搭建 | 复杂,需手动配置 | 快速,开箱即用 |
| Web 服务器 | 需外部 Tomcat | 内嵌服务器 |
| 依赖管理 | 手动管理版本 | Starter 统一管理 |
| 部署方式 | WAR 包 | JAR 包(可执行) |
| 开发效率 | 较低 | 高 |

### 1.2 SpringBoot 特性

**核心特性**

✅ **独立运行** - 无需外部 Web 服务器,可独立运行
✅ **自动配置** - 根据依赖自动配置 Spring 和第三方库
✅ **Starter 依赖** - 简化 Maven/Gradle 配置
✅ **生产就绪** - 内置健康检查、指标监控等功能
✅ **无代码生成** - 不生成代码,不需要 XML 配置

**SpringBoot 版本**

- SpringBoot 1.x - 基于 Spring 4.x
- SpringBoot 2.x - 基于 Spring 5.x,Java 8+
- SpringBoot 3.x - 基于 Spring 6.x,Java 17+

### 1.3 学习路线图

```
基础阶段
├── SpringBoot 快速入门
├── 核心配置(application.yml)
├── 常用注解
└── Web 开发基础

进阶阶段
├── 数据访问(JPA、MyBatis)
├── 整合 Redis、RabbitMQ
├── RESTful API 设计
└── 异常处理与日志

高级阶段
├── Spring Security 安全认证
├── 微服务架构
├── 性能优化
└── 部署与运维
```

---

## 二、环境搭建与快速开始

### 2.1 环境准备

**所需工具**

- **JDK** - Java 开发工具包(推荐 JDK 8 或 JDK 11/17)
- **Maven** - 项目构建工具(或 Gradle)
- **IDE** - IntelliJ IDEA(推荐)或 Eclipse
- **数据库** - MySQL 8.0+(可选)

**安装 JDK**

```bash
# 检查 JDK 版本
java -version

# 设置环境变量
JAVA_HOME=C:\Program Files\Java\jdk-11
PATH=%JAVA_HOME%\bin
```

**安装 Maven**

```bash
# 检查 Maven 版本
mvn -version

# 配置 Maven 仓库镜像(settings.xml)
<mirror>
  <id>aliyun</id>
  <mirrorOf>central</mirrorOf>
  <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```

### 2.2 创建 SpringBoot 项目

#### 2.2.1 使用 Spring Initializr(推荐)

**在线创建**

1. 访问 https://start.spring.io/
2. 填写项目信息:
   - Project: Maven
   - Language: Java
   - Spring Boot: 2.7.x 或 3.x
   - Group: com.example
   - Artifact: demo
   - Packaging: Jar
   - Java: 11 或 17
3. 选择依赖:
   - Spring Web
   - Spring Data JPA
   - MySQL Driver
4. 点击 Generate 下载项目

**IDEA 中创建**

1. File → New → Project
2. 选择 Spring Initializr
3. 填写项目信息
4. 选择依赖
5. 创建项目

#### 2.2.2 项目结构

```
demo/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/demo/
│   │   │       ├── DemoApplication.java     # 启动类
│   │   │       ├── controller/              # 控制器
│   │   │       ├── service/                 # 业务逻辑
│   │   │       ├── entity/                  # 实体类
│   │   │       └── repository/              # 数据访问
│   │   └── resources/
│   │       ├── application.yml              # 配置文件
│   │       ├── static/                      # 静态资源
│   │       └── templates/                   # 模板文件
│   └── test/
│       └── java/                            # 测试代码
├── pom.xml                                  # Maven 配置
└── README.md
```

### 2.3 第一个 SpringBoot 应用

#### 2.3.1 pom.xml 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- 继承 SpringBoot 父项目 -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.18</version>
        <relativePath/>
    </parent>

    <!-- 项目信息 -->
    <groupId>com.example</groupId>
    <artifactId>demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>demo</name>
    <description>Demo project for Spring Boot</description>

    <!-- JDK 版本 -->
    <properties>
        <java.version>11</java.version>
    </properties>

    <!-- 依赖 -->
    <dependencies>
        <!-- Web 开发 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- 测试 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <!-- 构建插件 -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

#### 2.3.2 启动类

```java
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * SpringBoot 启动类
 * @SpringBootApplication 组合注解,包含:
 * - @SpringBootConfiguration: 标记为配置类(等同于@Configuration)
 * - @EnableAutoConfiguration: 启用自动配置(根据classpath自动配置Bean)
 * - @ComponentScan: 扫描组件(扫描当前包及子包下的@Component、@Service、@Controller等)
 */
@SpringBootApplication  // 标记为SpringBoot应用的主配置类
public class DemoApplication {

    public static void main(String[] args) {
        // 启动 SpringBoot 应用
        // SpringApplication.run()会创建ApplicationContext、扫描Bean、启动内嵌Web服务器
        SpringApplication.run(DemoApplication.class, args);
        // 输出: Started DemoApplication in 2.5 seconds (JVM running for 3.0)
    }
}
```

> ⚠️ **注意事项**:
> - **启动类位置**: 必须放在根包下,否则无法扫描到子包的组件
> - **包结构**: 启动类所在包要包含所有业务代码包
> - **端口占用**: 默认8080端口,被占用需修改配置
> - **自动配置**: @EnableAutoConfiguration扫描所有jar的META-INF/spring.factories
> - **扫描范围**: 默认只扫描启动类所在包及子包
>
> ```java
> // 常见错误:启动类位置不对
> // com.example.demo.DemoApplication ✅ 正确
> // com.example.demo.controller.DemoApplication ❌ 错误:无法扫描到其他包
>
> // 手动指定扫描包
> @SpringBootApplication(scanBasePackages = {"com.example.demo", "com.other"})
> public class DemoApplication {}
>
> // 排除自动配置
> @SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
> public class DemoApplication {}  // 不使用数据库时排除数据源配置
> ```
>
> 🎯 **实际应用场景**:
> ```java
> // 场景1:自定义启动Banner
> @SpringBootApplication
> public class DemoApplication {
>     public static void main(String[] args) {
>         SpringApplication app = new SpringApplication(DemoApplication.class);
>         app.setBannerMode(Banner.Mode.OFF);  // 关闭启动Banner
>         app.run(args);
>     }
> }
>
> // 场景2:启动时执行初始化
> @SpringBootApplication
> public class DemoApplication implements CommandLineRunner {
>     public static void main(String[] args) {
>         SpringApplication.run(DemoApplication.class, args);
>     }
>
>     @Override
>     public void run(String... args) throws Exception {
>         System.out.println("应用启动成功,开始初始化...");
>         // 初始化缓存、加载配置等
>     }
> }
>
> // 场景3:设置默认配置
> @SpringBootApplication
> public class DemoApplication {
>     public static void main(String[] args) {
>         SpringApplication app = new SpringApplication(DemoApplication.class);
>         Properties props = new Properties();
>         props.setProperty("server.port", "8080");
>         app.setDefaultProperties(props);
>         app.run(args);
>     }
> }
> ```


#### 2.3.3 创建 Controller

```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

/**
 * HelloController
 * @RestController = @Controller + @ResponseBody
 * 返回 JSON 数据,而不是视图
 */
@RestController
@RequestMapping("/api")
public class HelloController {

    /**
     * GET 请求示例
     * 访问: http://localhost:8080/api/hello
     */
    @GetMapping("/hello")
    public String hello() {
        return "Hello, SpringBoot!";
    }

    /**
     * 带路径参数
     * 访问: http://localhost:8080/api/hello/张三
     */
    @GetMapping("/hello/{name}")
    public String helloName(@PathVariable String name) {
        return "Hello, " + name + "!";
    }

    /**
     * 带查询参数
     * 访问: http://localhost:8080/api/greet?name=张三&age=18
     */
    @GetMapping("/greet")
    public String greet(
        @RequestParam(defaultValue = "Guest") String name,
        @RequestParam(required = false) Integer age
    ) {
        return "Hello, " + name + "! Age: " + (age != null ? age : "未知");
    }

    /**
     * POST 请求示例
     * 接收 JSON 数据
     */
    @PostMapping("/user")
    public String createUser(@RequestBody User user) {
        return "Created user: " + user.getName();
    }
}

// User 类
class User {
    private String name;
    private Integer age;

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
}
```

#### 2.3.4 application.yml 配置

```yaml
# 服务器配置
server:
  port: 8080                # 端口
  servlet:
    context-path: /         # 应用上下文路径

# Spring 配置
spring:
  application:
    name: demo              # 应用名称
```

#### 2.3.5 运行应用

**方式1: IDE 运行**
- 右键 `DemoApplication.java`
- 选择 `Run 'DemoApplication'`

**方式2: Maven 命令**

```bash
# 编译打包
mvn clean package

# 运行 JAR 包
java -jar target/demo-0.0.1-SNAPSHOT.jar

# 或者直接运行
mvn spring-boot:run
```

**测试接口**

```bash
# 使用 curl 测试
curl http://localhost:8080/api/hello

# 使用浏览器访问
http://localhost:8080/api/hello
http://localhost:8080/api/hello/张三
http://localhost:8080/api/greet?name=李四&age=20
```

---

## 三、SpringBoot 核心特性

### 3.1 配置文件

> 💡 **SpringBoot 配置文件**：
> - 支持 `.properties` 和 `.yml/.yaml` 两种格式
> - **推荐使用 YAML** 格式,层次更清晰
> - **配置优先级**(高到低):
>   1. 命令行参数
>   2. application-{profile}.yml
>   3. application.yml
>   4. @PropertySource 指定的配置
> - **多环境配置**:
>   - `application-dev.yml` - 开发环境
>   - `application-test.yml` - 测试环境
>   - `application-prod.yml` - 生产环境

#### 3.1.1 YAML 语法

```yaml
# 基本语法
key: value

# 对象
user:
  name: 张三
  age: 18

# 行内对象
user: {name: 张三, age: 18}

# 数组
hobbies:
  - 读书
  - 运动
  - 旅游

# 行内数组
hobbies: [读书, 运动, 旅游]

# 多行文本
description: |
  这是一段
  多行文本
  内容

# 引用其他配置
server:
  port: 8080

my:
  port: ${server.port}  # 引用 server.port
```

#### 3.1.2 常用配置

```yaml
# ========== 服务器配置 ==========
server:
  port: 8080
  servlet:
    context-path: /api
    encoding:
      charset: UTF-8
      enabled: true
  tomcat:
    uri-encoding: UTF-8
    max-threads: 200
    max-connections: 10000

# ========== Spring 配置 ==========
spring:
  application:
    name: demo-app

  # 数据源配置
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
    username: root
    password: 123456
    # Hikari 连接池配置
    hikari:
      minimum-idle: 5
      maximum-pool-size: 20
      connection-timeout: 30000
      idle-timeout: 600000
      max-lifetime: 1800000

  # JPA 配置
  jpa:
    database: mysql
    show-sql: true
    hibernate:
      ddl-auto: update  # create/update/validate/none
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.MySQL8Dialect

  # Jackson 配置
  jackson:
    date-format: yyyy-MM-dd HH:mm:ss
    time-zone: GMT+8
    serialization:
      write-dates-as-timestamps: false

  # 文件上传配置
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 100MB

  # Redis 配置
  redis:
    host: localhost
    port: 6379
    password:
    database: 0
    timeout: 3000
    lettuce:
      pool:
        max-active: 8
        max-wait: -1ms
        max-idle: 8
        min-idle: 0

# ========== MyBatis 配置 ==========
mybatis:
  mapper-locations: classpath:mapper/*.xml
  type-aliases-package: com.example.demo.entity
  configuration:
    map-underscore-to-camel-case: true  # 驼峰命名转换
    cache-enabled: true                  # 二级缓存
    lazy-loading-enabled: true           # 延迟加载
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl

# ========== 日志配置 ==========
logging:
  level:
    root: INFO
    com.example.demo: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{50} - %msg%n"
  file:
    name: logs/app.log
    max-size: 10MB
    max-history: 30

# ========== 自定义配置 ==========
my:
  config:
    name: Demo App
    version: 1.0.0
    author: 张三
```

#### 3.1.3 多环境配置

**application.yml - 主配置文件**

```yaml
spring:
  profiles:
    active: dev  # 激活的环境(dev/test/prod)

# 公共配置
server:
  servlet:
    encoding:
      charset: UTF-8
```

**application-dev.yml - 开发环境**

```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:mysql://localhost:3306/test_dev
    username: root
    password: 123456

logging:
  level:
    root: DEBUG
```

**application-prod.yml - 生产环境**

```yaml
server:
  port: 80

spring:
  datasource:
    url: jdbc:mysql://prod-server:3306/test_prod
    username: prod_user
    password: ${DB_PASSWORD}  # 从环境变量读取

logging:
  level:
    root: INFO
  file:
    name: /var/logs/app.log
```

**启动时指定环境**

```bash
# 方式1: application.yml 中配置
spring.profiles.active=prod

# 方式2: 命令行参数
java -jar app.jar --spring.profiles.active=prod

# 方式3: 环境变量
export SPRING_PROFILES_ACTIVE=prod
```

#### 3.1.4 读取配置

**@Value 注解**

```java
@RestController
public class ConfigController {

    @Value("${server.port}")
    private int port;

    @Value("${spring.application.name}")
    private String appName;

    @Value("${my.config.version:1.0}")  // 默认值
    private String version;

    @GetMapping("/config")
    public String getConfig() {
        return "Port: " + port + ", App: " + appName + ", Version: " + version;
    }
}
```

**@ConfigurationProperties 注解(推荐)**

```java
// 配置类
@Component
@ConfigurationProperties(prefix = "my.config")
@Data  // Lombok 注解,自动生成 getter/setter
public class MyConfig {
    private String name;
    private String version;
    private String author;
}

// 使用配置
@RestController
public class ConfigController {

    @Autowired
    private MyConfig myConfig;

    @GetMapping("/myconfig")
    public MyConfig getMyConfig() {
        return myConfig;
    }
}
```

**Environment 对象**

```java
@RestController
public class ConfigController {

    @Autowired
    private Environment env;

    @GetMapping("/env")
    public String getEnv() {
        String port = env.getProperty("server.port");
        String name = env.getProperty("spring.application.name");
        return "Port: " + port + ", Name: " + name;
    }
}
```

### 3.2 常用注解

> 💡 **SpringBoot 核心注解**：
> - **@SpringBootApplication** - 启动类注解
> - **@RestController** - RESTful API 控制器
> - **@Service** - 业务逻辑层
> - **@Repository** - 数据访问层
> - **@Component** - 通用组件
> - **@Autowired** - 自动注入依赖
> - **@Configuration** - 配置类
> - **@Bean** - 定义 Bean

#### 3.2.1 核心注解详解

```java
/**
 * @SpringBootApplication
 * 组合注解,包含:
 * - @SpringBootConfiguration: 配置类
 * - @EnableAutoConfiguration: 自动配置
 * - @ComponentScan: 组件扫描
 */
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

/**
 * @RestController
 * = @Controller + @ResponseBody
 * 返回 JSON 数据
 */
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}

/**
 * @Service
 * 标记业务逻辑层组件
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}

/**
 * @Repository
 * 标记数据访问层组件
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByName(String name);
}

/**
 * @Component
 * 通用组件注解
 */
@Component
public class MyComponent {
    public void doSomething() {
        // 业务逻辑
    }
}

/**
 * @Configuration
 * 配置类注解
 */
@Configuration
public class MyConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```

#### 3.2.2 Web 相关注解

```java
@RestController
@RequestMapping("/api")
public class WebAnnotationDemo {

    /**
     * @GetMapping - GET 请求
     */
    @GetMapping("/users")
    public List<User> getUsers() {
        return Arrays.asList(new User("张三"), new User("李四"));
    }

    /**
     * @PostMapping - POST 请求
     * @RequestBody - 接收 JSON 数据
     */
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return user;
    }

    /**
     * @PutMapping - PUT 请求
     */
    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return user;
    }

    /**
     * @DeleteMapping - DELETE 请求
     */
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable Long id) {
        // 删除逻辑
    }

    /**
     * @PathVariable - 路径参数
     * @RequestParam - 查询参数
     * @RequestHeader - 请求头
     */
    @GetMapping("/search/{category}")
    public String search(
        @PathVariable String category,
        @RequestParam String keyword,
        @RequestParam(defaultValue = "1") int page,
        @RequestHeader("User-Agent") String userAgent
    ) {
        return "Category: " + category + ", Keyword: " + keyword +
               ", Page: " + page + ", User-Agent: " + userAgent;
    }
}
```

#### 3.2.3 依赖注入注解

```java
@Service
public class DependencyInjectionDemo {

    /**
     * @Autowired - 按类型自动注入(推荐)
     */
    @Autowired
    private UserRepository userRepository;

    /**
     * 构造器注入(推荐,final 保证不可变)
     */
    private final UserService userService;

    @Autowired
    public DependencyInjectionDemo(UserService userService) {
        this.userService = userService;
    }

    /**
     * @Resource - 按名称注入(JSR-250)
     */
    @Resource(name = "myBean")
    private MyBean myBean;

    /**
     * @Qualifier - 指定注入的 Bean
     */
    @Autowired
    @Qualifier("userServiceImpl")
    private UserService specificService;
}
```

> 💡 **常见面试问法：依赖注入用字段注入还是构造器注入？**
> - **字段注入（`@Autowired` 直接写在字段上）**：写法最简洁，但官方不推荐。原因：1) 无法用 `final` 修饰，对象可变；2) 脱离 Spring 容器无法 new 出可用对象，单元测试不方便；3) 容易掩盖循环依赖问题。
> - **构造器注入（推荐）**：字段可声明为 `final`，保证依赖不可变且不为 null；便于写单元测试。Spring 4.3+ 当类只有一个构造器时，可以省略构造器上的 `@Autowired`。
> - 配合 Lombok 的 `@RequiredArgsConstructor`，可以为所有 `final` 字段自动生成构造器，写法和字段注入一样简洁：
>
> ```java
> @Service
> @RequiredArgsConstructor  // 自动为 final 字段生成构造器,完成注入
> public class UserService {
>     private final UserRepository userRepository;  // 构造器注入,推荐
> }
> ```
>
> ⚠️ **新手易踩坑：`@Transactional` 自调用失效**
> - `@Transactional`、`@Async`、`@Cacheable` 都依赖 Spring AOP 代理生效。**同一个类内部方法 A 直接调用本类的事务方法 B，事务不会生效**（因为没有经过代理对象）。
> - 解决：把方法 B 拆到另一个 Bean 中调用，或注入自身代理。另外 `@Transactional` 默认只对 `RuntimeException` 回滚，受检异常需配置 `rollbackFor = Exception.class`。

### 3.3 自动配置原理

> 💡 **SpringBoot 自动配置**：
> - **核心**：根据添加的依赖自动配置 Spring 应用
> - **实现**：通过 `@EnableAutoConfiguration` 注解
> - **原理**：
>   1. 扫描所有 jar 包中的 `META-INF/spring.factories`
>   2. 加载 `EnableAutoConfiguration` 指定的配置类
>   3. 根据 `@Conditional` 条件判断是否生效
> - **常见自动配置**：
>   - DataSource - 数据源配置
>   - JPA/MyBatis - 持久化框架
>   - Redis - 缓存配置
>   - Security - 安全配置

**查看自动配置报告**

```yaml
# application.yml
debug: true  # 开启 debug 模式,查看自动配置报告
```

**自定义自动配置**

```java
/**
 * 自动配置类
 * @ConditionalOnClass: 当类路径存在指定类时生效
 * @ConditionalOnMissingBean: 当容器中没有指定 Bean 时生效
 * @EnableConfigurationProperties: 启用配置属性
 */
@Configuration
@ConditionalOnClass(MyService.class)
@EnableConfigurationProperties(MyProperties.class)
public class MyAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public MyService myService(MyProperties properties) {
        return new MyService(properties);
    }
}

/**
 * 配置属性类
 */
@ConfigurationProperties(prefix = "my.service")
public class MyProperties {
    private boolean enabled = true;
    private String name;

    // Getters and Setters
}

/**
 * META-INF/spring.factories
 */
// org.springframework.boot.autoconfigure.EnableAutoConfiguration=\
// com.example.config.MyAutoConfiguration
```

---

## 四、Web 开发

### 4.1 RESTful API 设计

> 💡 **RESTful API 设计原则**：
> - **资源导向** - URL 表示资源,使用名词复数
> - **HTTP 方法** - GET(查询)、POST(创建)、PUT(更新)、DELETE(删除)
> - **状态码** - 使用标准 HTTP 状态码
> - **无状态** - 每个请求包含完整信息
> - **统一接口** - 返回格式统一(JSON)

#### 4.1.1 RESTful API 示例

```java
/**
 * 用户管理 API
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 获取用户列表
     * GET /api/users?page=1&size=10&name=张三
     */
    @GetMapping
    public ResponseEntity<PageResult<User>> getUsers(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String name
    ) {
        PageResult<User> result = userService.getUsers(page, size, name);
        return ResponseEntity.ok(result);
    }

    /**
     * 获取单个用户
     * GET /api/users/1
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    /**
     * 创建用户
     * POST /api/users
     * Content-Type: application/json
     * Body: {"name": "张三", "age": 18, "email": "zhangsan@example.com"}
     */
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody @Valid User user) {
        User createdUser = userService.create(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }

    /**
     * 更新用户(完整更新)
     * PUT /api/users/1
     */
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable Long id,
        @RequestBody @Valid User user
    ) {
        user.setId(id);
        User updatedUser = userService.update(user);
        return ResponseEntity.ok(updatedUser);
    }

    /**
     * 部分更新用户
     * PATCH /api/users/1
     */
    @PatchMapping("/{id}")
    public ResponseEntity<User> patchUser(
        @PathVariable Long id,
        @RequestBody Map<String, Object> updates
    ) {
        User user = userService.partialUpdate(id, updates);
        return ResponseEntity.ok(user);
    }

    /**
     * 删除用户
     * DELETE /api/users/1
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
```

#### 4.1.2 统一响应格式

```java
/**
 * 统一响应实体
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApiResponse<T> {
    private int code;           // 状态码
    private String message;     // 提示信息
    private T data;             // 数据
    private long timestamp;     // 时间戳

    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(200, "success", data, System.currentTimeMillis());
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(200, message, data, System.currentTimeMillis());
    }

    public static <T> ApiResponse<T> error(int code, String message) {
        return new ApiResponse<>(code, message, null, System.currentTimeMillis());
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(500, message, null, System.currentTimeMillis());
    }
}

/**
 * 分页结果
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResult<T> {
    private List<T> list;       // 数据列表
    private long total;         // 总记录数
    private int page;           // 当前页码
    private int size;           // 每页大小
    private int totalPages;     // 总页数

    public PageResult(List<T> list, long total, int page, int size) {
        this.list = list;
        this.total = total;
        this.page = page;
        this.size = size;
        this.totalPages = (int) Math.ceil((double) total / size);
    }
}

/**
 * 使用统一响应
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public ApiResponse<PageResult<User>> getUsers(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        PageResult<User> result = userService.getUsers(page, size);
        return ApiResponse.success(result);
    }

    @PostMapping
    public ApiResponse<User> createUser(@RequestBody @Valid User user) {
        User createdUser = userService.create(user);
        return ApiResponse.success("用户创建成功", createdUser);
    }
}
```

### 4.2 参数校验

> 💡 **参数校验(Bean Validation)**：
> - **依赖**: `spring-boot-starter-validation`
> - **常用注解**:
>   - @NotNull - 不能为 null
>   - @NotBlank - 不能为空字符串
>   - @NotEmpty - 集合不能为空
>   - @Size - 长度限制
>   - @Min/@Max - 数值范围
>   - @Email - 邮箱格式
>   - @Pattern - 正则表达式
> - **使用**: 在参数前加 @Valid 或 @Validated

```java
/**
 * 用户实体(包含校验注解)
 */
@Data
public class User {

    private Long id;

    @NotBlank(message = "用户名不能为空")
    @Size(min = 2, max = 20, message = "用户名长度必须在2-20之间")
    private String name;

    @NotNull(message = "年龄不能为空")
    @Min(value = 1, message = "年龄最小为1岁")
    @Max(value = 150, message = "年龄最大为150岁")
    private Integer age;

    @NotBlank(message = "邮箱不能为空")
    @Email(message = "邮箱格式不正确")
    private String email;

    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String phone;
}

/**
 * Controller 中使用 @Valid
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    @PostMapping
    public ApiResponse<User> createUser(@RequestBody @Valid User user) {
        User createdUser = userService.create(user);
        return ApiResponse.success(createdUser);
    }
}

/**
 * 自定义校验注解
 */
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = IdCardValidator.class)
public @interface IdCard {
    String message() default "身份证号格式不正确";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

/**
 * 自定义校验器
 */
public class IdCardValidator implements ConstraintValidator<IdCard, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isEmpty()) {
            return true;
        }
        // 身份证号校验逻辑
        return value.matches("^\\d{15}|\\d{18}$");
    }
}
```

### 4.3 全局异常处理

```java
/**
 * 全局异常处理器
 * @ControllerAdvice: 全局 Controller 增强
 * @RestControllerAdvice = @ControllerAdvice + @ResponseBody
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    /**
     * 处理参数校验异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ApiResponse<Void> handleValidationException(MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        StringBuilder sb = new StringBuilder();

        for (FieldError fieldError : bindingResult.getFieldErrors()) {
            sb.append(fieldError.getField())
              .append(": ")
              .append(fieldError.getDefaultMessage())
              .append("; ");
        }

        String message = sb.toString();
        log.error("参数校验失败: {}", message);
        return ApiResponse.error(400, message);
    }

    /**
     * 处理业务异常
     */
    @ExceptionHandler(BusinessException.class)
    public ApiResponse<Void> handleBusinessException(BusinessException e) {
        log.error("业务异常: {}", e.getMessage());
        return ApiResponse.error(e.getCode(), e.getMessage());
    }

    /**
     * 处理资源未找到异常
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ApiResponse<Void> handleNotFoundException(ResourceNotFoundException e) {
        log.error("资源未找到: {}", e.getMessage());
        return ApiResponse.error(404, e.getMessage());
    }

    /**
     * 处理其他异常
     */
    @ExceptionHandler(Exception.class)
    public ApiResponse<Void> handleException(Exception e) {
        log.error("系统异常: ", e);
        return ApiResponse.error("系统异常,请联系管理员");
    }
}

/**
 * 自定义业务异常
 */
@Data
@EqualsAndHashCode(callSuper = true)
public class BusinessException extends RuntimeException {
    private int code;

    public BusinessException(String message) {
        super(message);
        this.code = 500;
    }

    public BusinessException(int code, String message) {
        super(message);
        this.code = code;
    }
}

/**
 * 资源未找到异常
 */
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
```

### 4.4 文件上传下载

```java
/**
 * 文件上传下载 Controller
 */
@RestController
@RequestMapping("/api/files")
@Slf4j
public class FileController {

    @Value("${file.upload.path:./uploads}")
    private String uploadPath;

    /**
     * 单文件上传
     * POST /api/files/upload
     */
    @PostMapping("/upload")
    public ApiResponse<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ApiResponse.error("文件不能为空");
        }

        try {
            // 获取原始文件名
            String originalFilename = file.getOriginalFilename();
            // 生成新文件名(UUID + 扩展名)
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String newFilename = UUID.randomUUID().toString() + extension;

            // 创建上传目录
            File uploadDir = new File(uploadPath);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }

            // 保存文件
            File dest = new File(uploadDir, newFilename);
            file.transferTo(dest);

            log.info("文件上传成功: {}", newFilename);
            return ApiResponse.success("文件上传成功", newFilename);

        } catch (IOException e) {
            log.error("文件上传失败", e);
            return ApiResponse.error("文件上传失败");
        }
    }

    /**
     * 多文件上传
     */
    @PostMapping("/batch-upload")
    public ApiResponse<List<String>> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        List<String> filenames = new ArrayList<>();

        for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                try {
                    String originalFilename = file.getOriginalFilename();
                    String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                    String newFilename = UUID.randomUUID().toString() + extension;

                    File dest = new File(uploadPath, newFilename);
                    file.transferTo(dest);

                    filenames.add(newFilename);
                } catch (IOException e) {
                    log.error("文件上传失败: {}", file.getOriginalFilename(), e);
                }
            }
        }

        return ApiResponse.success("上传成功", filenames);
    }

    /**
     * 文件下载
     * GET /api/files/download/xxx.jpg
     */
    @GetMapping("/download/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            File file = new File(uploadPath, filename);
            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }

            Resource resource = new FileSystemResource(file);

            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                       "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);

        } catch (Exception e) {
            log.error("文件下载失败", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
```

---

## 五、数据访问

### 5.1 Spring Data JPA

> 💡 **Spring Data JPA**：
> - **JPA** - Java Persistence API(Java 持久化 API)
> - **ORM** - 对象关系映射(Object-Relational Mapping)
> - **优势**:
>   - 简化 CRUD 操作
>   - 支持方法名查询
>   - 自动建表
>   - 分页和排序
> - **常用注解**:
>   - @Entity - 实体类
>   - @Table - 表名
>   - @Id - 主键
>   - @GeneratedValue - 主键生成策略
>   - @Column - 字段映射

#### 5.1.1 添加依赖

```xml
<dependencies>
    <!-- Spring Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>

    <!-- MySQL 驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

#### 5.1.2 配置数据源

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai
    username: root
    password: 123456

  jpa:
    database: mysql
    show-sql: true  # 显示 SQL 语句
    hibernate:
      ddl-auto: update  # 自动更新表结构
    properties:
      hibernate:
        format_sql: true  # 格式化 SQL
        dialect: org.hibernate.dialect.MySQL8Dialect
```

#### 5.1.3 定义实体类

```java
/**
 * 用户实体
 * @Entity: 标记为 JPA 实体
 * @Table: 指定表名
 */
@Entity
@Table(name = "tb_user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    /**
     * @Id: 主键
     * @GeneratedValue: 主键生成策略
     * - AUTO: 自动选择
     * - IDENTITY: 自增(MySQL)
     * - SEQUENCE: 序列(Oracle)
     * - TABLE: 表生成器
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * @Column: 字段映射
     * - name: 字段名
     * - length: 长度
     * - nullable: 是否可空
     * - unique: 是否唯一
     */
    @Column(name = "username", length = 50, nullable = false, unique = true)
    private String name;

    @Column(name = "age")
    private Integer age;

    @Column(name = "email", length = 100)
    private String email;

    /**
     * @CreatedDate: 创建时间
     * @LastModifiedDate: 更新时间
     * 需要在启动类添加 @EnableJpaAuditing
     */
    @CreatedDate
    @Column(name = "create_time", updatable = false)
    private LocalDateTime createTime;

    @LastModifiedDate
    @Column(name = "update_time")
    private LocalDateTime updateTime;
}

/**
 * 启动类开启 JPA 审计
 */
@SpringBootApplication
@EnableJpaAuditing
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

#### 5.1.4 定义 Repository

```java
/**
 * UserRepository
 * 继承 JpaRepository<实体类, 主键类型>
 * 自动拥有 CRUD 方法
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * 方法名查询
     * 命名规则: findBy + 属性名 + 关键字
     *
     * 关键字:
     * - And: 与
     * - Or: 或
     * - Between: 范围
     * - LessThan: 小于
     * - GreaterThan: 大于
     * - Like: 模糊查询
     * - OrderBy: 排序
     */

    // 根据名称查询
    List<User> findByName(String name);

    // 根据名称和年龄查询
    List<User> findByNameAndAge(String name, Integer age);

    // 根据名称模糊查询
    List<User> findByNameLike(String name);

    // 根据年龄范围查询
    List<User> findByAgeBetween(Integer minAge, Integer maxAge);

    // 根据年龄排序
    List<User> findByOrderByAgeDesc();

    /**
     * @Query 注解查询
     * JPQL: Java Persistence Query Language
     */
    @Query("SELECT u FROM User u WHERE u.name = ?1")
    User findByNameJPQL(String name);

    @Query("SELECT u FROM User u WHERE u.name = :name AND u.age = :age")
    User findByNameAndAgeJPQL(@Param("name") String name, @Param("age") Integer age);

    /**
     * 原生 SQL 查询
     */
    @Query(value = "SELECT * FROM tb_user WHERE username = ?1", nativeQuery = true)
    User findByNameNative(String name);

    /**
     * 更新操作
     * @Modifying: 标记为修改操作
     * @Transactional: 事务
     */
    @Modifying
    @Transactional
    @Query("UPDATE User u SET u.age = :age WHERE u.id = :id")
    int updateAgeById(@Param("id") Long id, @Param("age") Integer age);

    /**
     * 删除操作
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.name = :name")
    int deleteByName(@Param("name") String name);
}
```

#### 5.1.5 Service 层

```java
@Service
@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * 查询所有用户
     */
    public List<User> findAll() {
        return userRepository.findAll();
    }

    /**
     * 根据 ID 查询
     */
    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("用户不存在: " + id));
    }

    /**
     * 创建用户
     */
    @Transactional
    public User create(User user) {
        return userRepository.save(user);
    }

    /**
     * 更新用户
     */
    @Transactional
    public User update(User user) {
        // 检查用户是否存在
        User existingUser = findById(user.getId());

        // 更新字段
        existingUser.setName(user.getName());
        existingUser.setAge(user.getAge());
        existingUser.setEmail(user.getEmail());

        return userRepository.save(existingUser);
    }

    /**
     * 删除用户
     */
    @Transactional
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    /**
     * 分页查询
     */
    public PageResult<User> getUsers(int page, int size, String name) {
        // 创建分页对象(page 从 0 开始)
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("id").descending());

        // 分页查询
        Page<User> pageResult;
        if (name != null && !name.isEmpty()) {
            pageResult = userRepository.findAll(
                (root, query, cb) -> cb.like(root.get("name"), "%" + name + "%"),
                pageable
            );
        } else {
            pageResult = userRepository.findAll(pageable);
        }

        return new PageResult<>(
            pageResult.getContent(),
            pageResult.getTotalElements(),
            page,
            size
        );
    }
}
```

### 5.2 MyBatis

> 💡 **MyBatis**：
> - **半自动 ORM 框架** - 需要手写 SQL
> - **优势**:
>   - SQL 灵活可控
>   - 性能优化空间大
>   - 支持动态 SQL
> - **两种使用方式**:
>   - XML 映射文件
>   - 注解方式

#### 5.2.1 添加依赖

```xml
<dependencies>
    <!-- MyBatis Spring Boot Starter -->
    <dependency>
        <groupId>org.mybatis.spring.boot</groupId>
        <artifactId>mybatis-spring-boot-starter</artifactId>
        <version>2.3.1</version>
    </dependency>

    <!-- MySQL 驱动 -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
</dependencies>
```

#### 5.2.2 配置

```yaml
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/test
    username: root
    password: 123456

mybatis:
  # Mapper XML 文件位置
  mapper-locations: classpath:mapper/*.xml
  # 实体类别名包
  type-aliases-package: com.example.demo.entity
  configuration:
    # 驼峰命名转换
    map-underscore-to-camel-case: true
    # 打印 SQL
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
```

#### 5.2.3 实体类

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    private Long id;
    private String name;
    private Integer age;
    private String email;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
```

#### 5.2.4 Mapper 接口

```java
/**
 * UserMapper
 * @Mapper: 标记为 MyBatis Mapper
 */
@Mapper
public interface UserMapper {

    /**
     * 查询所有用户
     */
    List<User> findAll();

    /**
     * 根据 ID 查询
     */
    User findById(@Param("id") Long id);

    /**
     * 插入用户
     */
    int insert(User user);

    /**
     * 更新用户
     */
    int update(User user);

    /**
     * 删除用户
     */
    int deleteById(@Param("id") Long id);

    /**
     * 根据名称查询
     */
    List<User> findByName(@Param("name") String name);

    /**
     * 分页查询
     */
    List<User> findByPage(@Param("offset") int offset, @Param("limit") int limit);

    /**
     * 统计总数
     */
    long count();
}
```

#### 5.2.5 Mapper XML

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.example.demo.mapper.UserMapper">

    <!-- 结果映射 -->
    <resultMap id="UserResultMap" type="User">
        <id property="id" column="id"/>
        <result property="name" column="username"/>
        <result property="age" column="age"/>
        <result property="email" column="email"/>
        <result property="createTime" column="create_time"/>
        <result property="updateTime" column="update_time"/>
    </resultMap>

    <!-- 查询所有用户 -->
    <select id="findAll" resultMap="UserResultMap">
        SELECT id, username, age, email, create_time, update_time
        FROM tb_user
        ORDER BY id DESC
    </select>

    <!-- 根据 ID 查询 -->
    <select id="findById" resultMap="UserResultMap">
        SELECT id, username, age, email, create_time, update_time
        FROM tb_user
        WHERE id = #{id}
    </select>

    <!-- 插入用户 -->
    <insert id="insert" useGeneratedKeys="true" keyProperty="id">
        INSERT INTO tb_user (username, age, email, create_time, update_time)
        VALUES (#{name}, #{age}, #{email}, NOW(), NOW())
    </insert>

    <!-- 更新用户 -->
    <update id="update">
        UPDATE tb_user
        SET username = #{name},
            age = #{age},
            email = #{email},
            update_time = NOW()
        WHERE id = #{id}
    </update>

    <!-- 删除用户 -->
    <delete id="deleteById">
        DELETE FROM tb_user WHERE id = #{id}
    </delete>

    <!-- 根据名称查询(模糊查询) -->
    <select id="findByName" resultMap="UserResultMap">
        SELECT id, username, age, email, create_time, update_time
        FROM tb_user
        WHERE username LIKE CONCAT('%', #{name}, '%')
    </select>

    <!-- 分页查询 -->
    <select id="findByPage" resultMap="UserResultMap">
        SELECT id, username, age, email, create_time, update_time
        FROM tb_user
        ORDER BY id DESC
        LIMIT #{offset}, #{limit}
    </select>

    <!-- 统计总数 -->
    <select id="count" resultType="long">
        SELECT COUNT(*) FROM tb_user
    </select>

    <!-- 动态 SQL 示例 -->
    <select id="findByCondition" resultMap="UserResultMap">
        SELECT id, username, age, email, create_time, update_time
        FROM tb_user
        <where>
            <if test="name != null and name != ''">
                AND username LIKE CONCAT('%', #{name}, '%')
            </if>
            <if test="minAge != null">
                AND age >= #{minAge}
            </if>
            <if test="maxAge != null">
                AND age &lt;= #{maxAge}
            </if>
        </where>
        ORDER BY id DESC
    </select>
</mapper>
```

#### 5.2.6 注解方式

```java
@Mapper
public interface UserMapper {

    /**
     * @Select 查询
     */
    @Select("SELECT * FROM tb_user WHERE id = #{id}")
    User findById(@Param("id") Long id);

    /**
     * @Insert 插入
     * @Options 获取自增主键
     */
    @Insert("INSERT INTO tb_user (username, age, email, create_time, update_time) " +
            "VALUES (#{name}, #{age}, #{email}, NOW(), NOW())")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(User user);

    /**
     * @Update 更新
     */
    @Update("UPDATE tb_user SET username = #{name}, age = #{age}, " +
            "email = #{email}, update_time = NOW() WHERE id = #{id}")
    int update(User user);

    /**
     * @Delete 删除
     */
    @Delete("DELETE FROM tb_user WHERE id = #{id}")
    int deleteById(@Param("id") Long id);

    /**
     * 复杂查询建议使用 XML
     */
    @Select("<script>" +
            "SELECT * FROM tb_user " +
            "<where>" +
            "  <if test='name != null'>AND username LIKE CONCAT('%', #{name}, '%')</if>" +
            "  <if test='age != null'>AND age = #{age}</if>" +
            "</where>" +
            "</script>")
    List<User> findByCondition(@Param("name") String name, @Param("age") Integer age);
}
```

---

## 六、Navicat Premium 16 使用指南

> 💡 **Navicat Premium 16**：
> - **数据库管理工具** - 支持 MySQL、PostgreSQL、Oracle、SQL Server 等
> - **核心功能**:
>   - 数据库连接管理
>   - SQL 查询和编辑
>   - 数据导入导出
>   - 数据库设计和建模
>   - 数据同步和备份
> - **优势**: 界面友好、功能强大、支持多种数据库

### 6.1 安装和启动

**下载安装**

1. 访问官网: https://www.navicat.com/
2. 下载 Navicat Premium 16 安装包
3. 运行安装程序,按提示完成安装
4. 启动 Navicat

**界面介绍**

```
Navicat 主界面
├── 菜单栏 - 文件、编辑、查看、数据库等菜单
├── 工具栏 - 常用功能快捷按钮
├── 连接列表 - 左侧数据库连接列表
├── 对象列表 - 数据库、表、视图等对象
└── 工作区 - 查询窗口、表设计器等
```

### 6.2 创建数据库连接

**连接 MySQL 数据库**

1. **新建连接**
   - 点击左上角 "连接" → "MySQL"
   - 或按 Ctrl+G

2. **填写连接信息**
   ```
   连接名: localhost_test
   主机: localhost
   端口: 3306
   用户名: root
   密码: 123456
   ```

3. **测试连接**
   - 点击 "测试连接" 按钮
   - 显示 "连接成功" 表示配置正确

4. **保存连接**
   - 点击 "确定" 保存连接

**连接属性设置**

- **高级选项卡**:
  - 编码: UTF-8
  - 使用 SSL: 根据需要
  - 压缩: 启用压缩传输

- **SSH 选项卡**(远程服务器):
  - 使用 SSH 通道: 勾选
  - SSH 地址: 远程服务器 IP
  - SSH 端口: 22
  - SSH 用户名: 服务器用户名
  - SSH 密码: 服务器密码

### 6.3 数据库操作

#### 6.3.1 创建数据库

**方式1: 图形界面**

1. 右键连接 → "新建数据库"
2. 填写数据库信息:
   ```
   数据库名: test
   字符集: utf8mb4
   排序规则: utf8mb4_general_ci
   ```
3. 点击 "确定"

**方式2: SQL 命令**

1. 点击 "查询" → "新建查询"
2. 输入 SQL:
   ```sql
   CREATE DATABASE test
   CHARACTER SET utf8mb4
   COLLATE utf8mb4_general_ci;
   ```
3. 点击 "运行"(F5)

#### 6.3.2 创建数据表

**方式1: 表设计器(推荐)**

1. 右键数据库 → "新建表"
2. 在表设计器中添加字段:
   ```
   字段名      类型          长度  非空  主键  自增  默认值
   -------------------------------------------------------
   id         BIGINT        20    √     √     √
   username   VARCHAR       50    √
   age        INT           11
   email      VARCHAR       100
   create_time DATETIME                              CURRENT_TIMESTAMP
   update_time DATETIME                              CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   ```
3. 设置主键:
   - 选中 id 字段
   - 右键 → "设为主键"
   - 勾选 "自增"

4. 添加索引:
   - 切换到 "索引" 选项卡
   - 点击 "+" 添加索引
   - 索引名: idx_username
   - 字段: username
   - 类型: UNIQUE

5. 保存表:
   - Ctrl+S 或点击 "保存"
   - 输入表名: tb_user

**方式2: SQL 命令**

```sql
-- 创建用户表
CREATE TABLE tb_user (
    id BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    username VARCHAR(50) NOT NULL COMMENT '用户名',
    age INT(11) DEFAULT NULL COMMENT '年龄',
    email VARCHAR(100) DEFAULT NULL COMMENT '邮箱',
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    update_time DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (id),
    UNIQUE KEY uk_username (username),
    KEY idx_age (age)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';
```

### 6.4 数据操作

#### 6.4.1 插入数据

**方式1: 表格界面**

1. 双击打开表 `tb_user`
2. 点击底部 "+" 按钮添加新行
3. 填写数据:
   ```
   username: 张三
   age: 18
   email: zhangsan@example.com
   ```
4. Ctrl+S 保存

**方式2: SQL 命令**

```sql
-- 插入单条数据
INSERT INTO tb_user (username, age, email)
VALUES ('张三', 18, 'zhangsan@example.com');

-- 插入多条数据
INSERT INTO tb_user (username, age, email) VALUES
('李四', 20, 'lisi@example.com'),
('王五', 22, 'wangwu@example.com'),
('赵六', 25, 'zhaoliu@example.com');
```

#### 6.4.2 查询数据

**基础查询**

```sql
-- 查询所有数据
SELECT * FROM tb_user;

-- 查询指定字段
SELECT id, username, age FROM tb_user;

-- 条件查询
SELECT * FROM tb_user WHERE age > 18;

-- 模糊查询
SELECT * FROM tb_user WHERE username LIKE '%张%';

-- 排序
SELECT * FROM tb_user ORDER BY age DESC;

-- 分页查询
SELECT * FROM tb_user LIMIT 0, 10;

-- 聚合函数
SELECT COUNT(*) FROM tb_user;
SELECT AVG(age) FROM tb_user;
SELECT MAX(age), MIN(age) FROM tb_user;

-- 分组查询
SELECT age, COUNT(*) as count
FROM tb_user
GROUP BY age
HAVING count > 1;
```

**多表查询**

```sql
-- 内连接
SELECT u.*, o.order_no
FROM tb_user u
INNER JOIN tb_order o ON u.id = o.user_id;

-- 左连接
SELECT u.*, o.order_no
FROM tb_user u
LEFT JOIN tb_order o ON u.id = o.user_id;

-- 子查询
SELECT * FROM tb_user
WHERE id IN (
    SELECT user_id FROM tb_order WHERE amount > 100
);
```

#### 6.4.3 更新数据

```sql
-- 更新单条
UPDATE tb_user
SET age = 19, email = 'new@example.com'
WHERE id = 1;

-- 批量更新
UPDATE tb_user
SET age = age + 1
WHERE age < 18;

-- 带条件更新
UPDATE tb_user
SET email = CONCAT(username, '@example.com')
WHERE email IS NULL;
```

#### 6.4.4 删除数据

```sql
-- 删除单条
DELETE FROM tb_user WHERE id = 1;

-- 条件删除
DELETE FROM tb_user WHERE age < 18;

-- 清空表(保留结构)
TRUNCATE TABLE tb_user;

-- 删除表
DROP TABLE tb_user;
```

### 6.5 数据导入导出

#### 6.5.1 导入数据

**从 Excel 导入**

1. 右键表 → "导入向导"
2. 选择文件类型: Excel
3. 选择 Excel 文件
4. 映射字段:
   ```
   Excel 列      数据库字段
   -------------------------
   姓名     →   username
   年龄     →   age
   邮箱     →   email
   ```
5. 点击 "开始" 导入

**从 CSV 导入**

1. 右键表 → "导入向导"
2. 选择文件类型: CSV
3. 设置分隔符: 逗号
4. 映射字段
5. 导入

**从 SQL 文件导入**

1. 右键数据库 → "运行 SQL 文件"
2. 选择 .sql 文件
3. 点击 "开始"

#### 6.5.2 导出数据

**导出为 Excel**

1. 右键表 → "导出向导"
2. 选择格式: Excel
3. 选择要导出的字段
4. 设置文件名和路径
5. 点击 "开始"

**导出为 SQL**

1. 右键数据库 → "数据传输"
2. 选择目标: SQL
3. 设置选项:
   - 包含表结构
   - 包含数据
   - DROP TABLE
4. 导出

**导出为 CSV**

1. 右键表 → "导出向导"
2. 选择格式: CSV
3. 设置分隔符和编码
4. 导出

### 6.6 查询设计器

**可视化查询**

1. 点击 "查询" → "新建查询"
2. 点击 "设计查询"
3. 添加表:
   - 拖拽表到设计器
   - 自动识别关联关系
4. 选择字段:
   - 勾选要查询的字段
5. 添加条件:
   - 在 "条件" 列输入条件
6. 查看 SQL:
   - 自动生成 SQL 语句
7. 运行查询

### 6.7 数据库设计工具

**ER 图设计**

1. 工具 → "ER 图设计器"
2. 创建新图表
3. 添加表:
   - 从数据库拖拽表
   - 或手动创建表
4. 设置关系:
   - 拖拽字段建立关联
   - 一对一、一对多、多对多
5. 导出:
   - 导出为图片
   - 导出为 SQL

**模型设计**

```
用户表 (tb_user)
├── id (主键)
├── username (唯一索引)
├── age
└── email

订单表 (tb_order)
├── id (主键)
├── user_id (外键 → tb_user.id)
├── order_no
├── amount
└── create_time

关系: 一个用户可以有多个订单(一对多)
```

### 6.8 数据备份与恢复

#### 6.8.1 备份数据库

**方式1: 转储 SQL 文件**

1. 右键数据库 → "转储 SQL 文件"
2. 选择选项:
   - 结构和数据
   - 仅结构
   - 仅数据
3. 选择保存路径
4. 点击 "开始"

**方式2: 数据传输**

1. 工具 → "数据传输"
2. 源: 选择数据库
3. 目标: 选择文件
4. 设置选项
5. 传输

#### 6.8.2 恢复数据库

**从 SQL 文件恢复**

1. 右键数据库 → "运行 SQL 文件"
2. 选择备份的 .sql 文件
3. 点击 "开始"

**从备份恢复**

1. 右键连接 → "新建数据库"
2. 创建空数据库
3. 运行 SQL 文件导入数据

### 6.9 实用技巧

#### 6.9.1 快捷键

```
常用快捷键:
- Ctrl+Q: 新建查询
- F5: 运行查询
- F6: 运行当前语句
- Ctrl+Shift+R: 运行选中的 SQL
- Ctrl+/: 注释/取消注释
- Ctrl+D: 复制当前行
- Ctrl+F: 查找
- Ctrl+H: 替换
- Ctrl+S: 保存
- F12: 美化 SQL
```

#### 6.9.2 SQL 美化

1. 编写 SQL 语句
2. 按 F12 或右键 → "美化 SQL"
3. SQL 自动格式化

**示例:**

```sql
-- 原始 SQL
select u.id,u.username,o.order_no from tb_user u left join tb_order o on u.id=o.user_id where u.age>18

-- 美化后
SELECT
    u.id,
    u.username,
    o.order_no
FROM tb_user u
LEFT JOIN tb_order o ON u.id = o.user_id
WHERE u.age > 18
```

#### 6.9.3 代码片段

**创建代码片段**

1. 工具 → "代码片段"
2. 新建代码片段
3. 设置:
   ```
   名称: sel
   代码: SELECT * FROM ${table} WHERE ${condition}
   ```
4. 保存

**使用代码片段**

1. 在查询窗口输入 `sel`
2. 按 Tab 键
3. 自动展开代码

#### 6.9.4 数据生成器

**生成测试数据**

1. 工具 → "数据生成器"
2. 选择表: tb_user
3. 设置字段生成规则:
   ```
   username: 随机姓名
   age: 随机数字(18-60)
   email: 随机邮箱
   ```
4. 设置行数: 1000
5. 点击 "开始"

### 6.10 SpringBoot 与 Navicat 协同开发

**开发流程**

1. **Navicat 中设计表结构**
   - 使用 ER 图设计数据库
   - 创建表和关系
   - 导出 SQL 脚本

2. **SpringBoot 中配置数据源**
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/test
       username: root
       password: 123456
   ```

3. **使用 JPA 自动建表(开发环境)**
   ```yaml
   spring:
     jpa:
       hibernate:
         ddl-auto: update
   ```

4. **使用 MyBatis 执行 SQL**
   - Navicat 中编写和测试 SQL
   - 复制到 Mapper XML 文件

5. **Navicat 中调试 SQL**
   - 查看执行计划
   - 优化慢查询

**示例: 完整开发流程**

```sql
-- 1. Navicat 中创建表
CREATE TABLE tb_product (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT(11) NOT NULL DEFAULT 0,
    create_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. 插入测试数据
INSERT INTO tb_product (name, price, stock) VALUES
('苹果', 5.5, 100),
('香蕉', 3.0, 200),
('橙子', 4.0, 150);

-- 3. 测试查询
SELECT * FROM tb_product WHERE price > 3.0 ORDER BY stock DESC;
```

```java
// 4. SpringBoot 中创建实体类
@Entity
@Table(name = "tb_product")
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private BigDecimal price;
    private Integer stock;
    private LocalDateTime createTime;
}

// 5. 创建 Repository
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByPriceGreaterThan(BigDecimal price);
}

// 6. 测试
@SpringBootTest
class ProductRepositoryTest {
    @Autowired
    private ProductRepository productRepository;

    @Test
    void testFindByPrice() {
        List<Product> products = productRepository
            .findByPriceGreaterThan(new BigDecimal("3.0"));
        products.forEach(System.out::println);
    }
}
```

---

## 七、整合第三方技术

### 7.1 Redis 缓存

#### 7.1.1 添加依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

#### 7.1.2 配置

```yaml
spring:
  redis:
    host: localhost
    port: 6379
    password:
    database: 0
    timeout: 3000
    lettuce:
      pool:
        max-active: 8
        max-wait: -1ms
        max-idle: 8
        min-idle: 0
```

#### 7.1.3 使用

```java
@Service
public class RedisService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    /**
     * 设置值
     */
    public void set(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }

    /**
     * 设置值(带过期时间)
     */
    public void set(String key, String value, long timeout, TimeUnit unit) {
        redisTemplate.opsForValue().set(key, value, timeout, unit);
    }

    /**
     * 获取值
     */
    public String get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    /**
     * 删除
     */
    public void delete(String key) {
        redisTemplate.delete(key);
    }
}

/**
 * 使用 @Cacheable 注解
 */
@Service
@CacheConfig(cacheNames = "user")
public class UserService {

    @Cacheable(key = "#id")
    public User findById(Long id) {
        // 从数据库查询
        return userRepository.findById(id).orElse(null);
    }

    @CachePut(key = "#user.id")
    public User update(User user) {
        return userRepository.save(user);
    }

    @CacheEvict(key = "#id")
    public void delete(Long id) {
        userRepository.deleteById(id);
    }
}
```

### 7.2 定时任务

```java
/**
 * 启动类开启定时任务
 */
@SpringBootApplication
@EnableScheduling
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

/**
 * 定时任务类
 */
@Component
@Slf4j
public class ScheduledTasks {

    /**
     * 每5秒执行一次
     */
    @Scheduled(fixedRate = 5000)
    public void task1() {
        log.info("定时任务1执行: {}", LocalDateTime.now());
    }

    /**
     * 每天凌晨1点执行
     * Cron 表达式: 秒 分 时 日 月 周
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void task2() {
        log.info("每天凌晨1点执行");
    }

    /**
     * 每隔10秒执行(上次执行完成后10秒)
     */
    @Scheduled(fixedDelay = 10000)
    public void task3() {
        log.info("任务3执行");
    }
}
```

### 7.3 异步任务

```java
/**
 * 启动类开启异步
 */
@SpringBootApplication
@EnableAsync
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

/**
 * 异步任务
 */
@Service
@Slf4j
public class AsyncService {

    @Async
    public void asyncTask() {
        log.info("异步任务开始");
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        log.info("异步任务结束");
    }

    @Async
    public Future<String> asyncTaskWithResult() {
        log.info("异步任务开始");
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return new AsyncResult<>("任务完成");
    }
}
```

---

## 八、实战项目

### 8.1 用户管理系统

**项目结构**

```
user-management/
├── controller/
│   └── UserController.java
├── service/
│   ├── UserService.java
│   └── impl/
│       └── UserServiceImpl.java
├── repository/
│   └── UserRepository.java
├── entity/
│   └── User.java
├── dto/
│   ├── UserDTO.java
│   └── PageRequest.java
└── exception/
    ├── GlobalExceptionHandler.java
    └── BusinessException.java
```

**完整代码示例**

```java
/**
 * UserController - 用户控制器
 */
@RestController
@RequestMapping("/api/users")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ApiResponse<PageResult<User>> list(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String name
    ) {
        PageResult<User> result = userService.getUsers(page, size, name);
        return ApiResponse.success(result);
    }

    @GetMapping("/{id}")
    public ApiResponse<User> getById(@PathVariable Long id) {
        User user = userService.findById(id);
        return ApiResponse.success(user);
    }

    @PostMapping
    public ApiResponse<User> create(@RequestBody @Valid User user) {
        User created = userService.create(user);
        return ApiResponse.success("创建成功", created);
    }

    @PutMapping("/{id}")
    public ApiResponse<User> update(@PathVariable Long id, @RequestBody @Valid User user) {
        user.setId(id);
        User updated = userService.update(user);
        return ApiResponse.success("更新成功", updated);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ApiResponse.success("删除成功", null);
    }
}
```

---

## 九、部署与运维

### 9.1 打包部署

```bash
# 打包
mvn clean package

# 运行
java -jar target/demo-0.0.1-SNAPSHOT.jar

# 指定环境
java -jar target/demo-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod

# 后台运行
nohup java -jar target/demo-0.0.1-SNAPSHOT.jar > app.log 2>&1 &
```

### 9.2 Docker 部署

```dockerfile
# Dockerfile
FROM openjdk:11-jre-slim
WORKDIR /app
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

```bash
# 构建镜像
docker build -t demo-app .

# 运行容器
docker run -d -p 8080:8080 --name demo demo-app
```

---

## 十、最佳实践

1. ✅ **使用 YAML 配置** - 更清晰
2. ✅ **分层架构** - Controller → Service → Repository
3. ✅ **统一响应格式** - 便于前端处理
4. ✅ **全局异常处理** - 统一错误处理
5. ✅ **参数校验** - 使用 Bean Validation
6. ✅ **日志记录** - 使用 SLF4J + Logback
7. ✅ **代码规范** - 遵循阿里巴巴 Java 开发手册
8. ✅ **单元测试** - 保证代码质量

---

**学习资源**

- [SpringBoot 官方文档](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [MyBatis](https://mybatis.org/mybatis-3/)
- [Navicat 官网](https://www.navicat.com/)

---

**最后更新:** 2025-11-03
**作者:** 前端学习笔记
